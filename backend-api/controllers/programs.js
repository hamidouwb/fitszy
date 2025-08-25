const programsRouter = require('express').Router()
const Program = require("../models/program")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// using bearer to only allow loggedin users to create programs
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


programsRouter.get('/', async (request, response) => {
})

programsRouter.get('/:id', async (request, response, next) => {
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


