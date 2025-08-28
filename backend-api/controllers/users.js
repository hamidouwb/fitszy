const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const multer = require("multer")
const mongoose = require('mongoose')

// Import the S3 Service
const s3Service = require('../services/s3Service')

// Import Mongoose Models
const User = require('../models/user')
const Program = require('../models/program')
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')

// Multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { userExtractor } = require('../utils/middleware')



usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('programs', { title: 1, description: 1 }) // Populate with basic program info
  response.json(users)
})

// GET a specific user by ID
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    // .populate to Get user and all programs
    const user = await User.findById(id).populate('programs') 

    if(!user) return response.status(404).json({ error: 'User not found' }).end()

    let userObj = user.toObject()

    if(user.avatarKey) {
      userObj.avatarUrl = await s3Service.getFileUrl(user.avatarKey)
    }
    response.json(userObj)
  } catch(error) {
    next(error)
  }

})

// POST a new user (Sign Up)
usersRouter.post('/', upload.single('avatar'), async (request, response, next) => {
  const { firstName, lastName, userName, email, password } = request.body

  // Basic validation
  if (!userName || !password || !firstName || !email) {
    return response.status(400).json({ error: 'First name, username, email, and password are required' })
  }
  if (password.length < 6) {
    return response.status(400).json({ error: 'Password must be at least 6 characters long' })
  }

  try {
    let avatarKey = null;

    // if file exist , send to S3 Bucket
    if (request.file) {
      avatarKey = await s3Service.uploadFile(request.file)
    }
    // Salting and hashing user password in can a database breach
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      firstName,
      lastName,
      userName,
      email,
      password: passwordHash, // hashed password
      avatarKey: avatarKey // null if no file is uploaded
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    next(error)
  }
})

// DELETE a user (Protected Route)
usersRouter.delete('/:id', userExtractor,  async (request, response, next) => {
  if (request.user.id.toString() !== request.params.id) {
    return response.status(401).json({ error: 'You can only delete your own account' });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findById(request.params.id)
      .populate({
        path: 'programs',
        populate: { path: 'workouts', populate: { path: 'exercises' } }
      })
      .session(session);

    if (!user) {
      await session.abortTransaction();
      return response.status(404).json({ error: 'User not found' });
    }

    const s3KeysToDelete = [];
    if (user.avatarKey) s3KeysToDelete.push({ Key: user.avatarKey });

    const programIds = [], workoutIds = [], exerciseIds = [];

    user.programs.forEach(p => {
      programIds.push(p._id);
      if (p.mediaKey) s3KeysToDelete.push({ Key: p.mediaKey });
      p.workouts.forEach(w => {
        workoutIds.push(w._id);
        if (w.mediaKey) s3KeysToDelete.push({ Key: w.mediaKey });
        w.exercises.forEach(e => {
          exerciseIds.push(e._id);
          if (e.mediaKey) s3KeysToDelete.push({ Key: e.mediaKey });
        });
      });
    });

    await s3Service.deleteFiles(s3KeysToDelete);

    if (exerciseIds.length > 0) await Exercise.deleteMany({ _id: { $in: exerciseIds } }).session(session);
    if (workoutIds.length > 0) await Workout.deleteMany({ _id: { $in: workoutIds } }).session(session);
    if (programIds.length > 0) await Program.deleteMany({ _id: { $in: programIds } }).session(session);

    await User.findByIdAndDelete(request.params.id).session(session);
    await session.commitTransaction();
    response.status(204).end();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
})

// UPDATE a user (Protected Route)
usersRouter.put('/:id',userExtractor, upload.single('avatar'), async (request, response, next) => {
  console.log(request.body)
  console.log(request.file)

  const { firstName, lastName, email } = request.body

  try {
    if (request.user.id.toString() !== request.params.id) {
      return response.status(401).json({ error: 'You can only update your own profile' })
    }

    const userToUpdate = await User.findById(request.params.id)
    if (!userToUpdate) {
      return response.status(404).json({ error: 'User not found' })
    }

    const updatedUserInfo = {
      firstName,
      lastName,
      email
    }

    if (request.file) {
      // If an old avatar exists, delete it from S3
      if (userToUpdate.avatarKey) {
        await s3Service.deleteFiles([{ Key: userToUpdate.avatarKey }])
      }
      // Upload the new avatar and get the new key
      const newAvatarKey = await s3Service.uploadFile(request.file)
      updatedUserInfo.avatarKey = newAvatarKey
    }


    const updatedUser = await User.findByIdAndUpdate(
      request.params.id, 
      updatedUserInfo, 
      { new: true, runValidators: true, context: 'query' }
    )

    response.json(updatedUser)
  } catch(error) {
    next(error)
  }
})

module.exports = usersRouter
