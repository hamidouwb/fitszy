const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

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

  response
    .status(200)
    .send({ token, userName: user.userName, firstName: user.firstName })
})

module.exports = loginRouter
