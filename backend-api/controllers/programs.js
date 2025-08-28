const programsRouter = require('express').Router()
const Program = require("../models/program")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

// using bearer to only allow loggedin users to create programs
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Get all public Programs
programsRouter.get('/', async (request, response) => {
  const programs = await Program.find({ public: true }).populate('user', { userName: 1, firstName: 1 })
  response.json(programs)
})

// Get Specific Program by id
programsRouter.get('/:id', async (request, response, next) => {
  const program = await Program.findById(request.params.id).populate({
    path: 'workouts',
    model: 'Workout',
    populate: {
      path: 'exercises',
      model: 'Exercise'
    }
  })

  let programObj = program.toObject()

  if(program.mediaKey) {
    const command = new GetObjectCommand({
      Bucket: config.BUCKET_NAME,
      Key: program.mediaKey
    })
    const url = await getSignedUrl(s3, command, {expiresIn: config.SIGNED_URL_EXPIRY })
    userObj.mediaUrl = url
  }


  if (program) {
    response.json(program)
  } else {
    response.status(404).end()
  }
})

programsRouter.post('/', async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const program = new Program({
    name: request.body.name,
    title: request.body.title,
    description: request.body.description,
    mediaUrl: request.body.mediaUrl,
    user: user._id,
  })

  const savedProgram = await program.save()
  user.programs = user.programs.concat(savedProgram._id)
  await user.save()

  response.status(201).json(savedProgram)
})

programsRouter.delete('/:id', async (request, response, next) => {
})

programsRouter.put('/:id', async (request, response, next) => {
})

module.exports = programsRouter


