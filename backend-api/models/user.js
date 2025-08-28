const mongoose = require('mongoose')
const config = require('../utils/config')

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  avatarKey: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: config.DEFAULT_AVATAR 
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }
  ]
})

// Atlasdb retuns a _id as an object this is to turn it into a string
schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', schema)
