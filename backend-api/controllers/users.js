const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require("../models/user")
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const config = require("../utils/config")
const crypto = require('crypto');

const randomMedia = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  region: config.AWS_REGION
})

usersRouter.get('/', async (request, response) => {
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    // .populate to Get user and all programs
    const user = await User.findById(id).populate('programs') 

    if(!user) return response.status(404).end()

    let userObj = user.toObject()

    if(user.avatarKey) {
      const command = new GetObjectCommand({
        Bucket: config.BUCKET_NAME,
        Key: user.avatarKey
      })
      const url = await getSignedUrl(s3, command, {expiresIn: config.SIGNED_URL_EXPIRY })
      userObj.avatarUrl = url
    }

    response.json(userObj)
  } catch(error) {
    next(error)
  }

})

usersRouter.post('/', upload.single('avatar'), async (request, response, next) => {
  const body = request.body

  console.log(request.file)

  const avatarKey = randomMedia()
  const command = new PutObjectCommand({
    Bucket: config.BUCKET_NAME,
    Key: avatarKey,
    Body: request.file.buffer,
    ContentType: request.file.mimetype
  })

  await s3.send(command)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)


  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName || false,
    userName: body.userName,
    email: body.email,
    password: passwordHash,
    avatarKey: avatarKey
  })


  await user.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

usersRouter.delete('/:id', async (request, response, next) => {
})

usersRouter.put('/:id', async (request, response, next) => {
})

module.exports = usersRouter
