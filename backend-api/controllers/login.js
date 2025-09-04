const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const s3Service = require('../services/s3Service')

loginRouter.post('/', async (request, response) => {
  const { userName, password } = request.body

  const user = await User.findOne({ userName })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    userName: user.userName,
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour(the lower the better)
  const token = jwt.sign(
    userForToken, 
    config.SECRET,    
    { expiresIn: 60*60 }
  )

  // Generate fresh avatar URL from S3 key if it exists
  let avatarUrl = config.DEFAULT_AVATAR
  if (user.avatarKey) {
    avatarUrl = await s3Service.getFileUrl(user.avatarKey)
  }

  response
    .status(200)
    .send({ token, userName: user.userName, firstName: user.firstName,
      avatarUrl: avatarUrl
    })
})

module.exports = loginRouter
