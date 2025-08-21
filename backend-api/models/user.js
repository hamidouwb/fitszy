const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5
  },
  userName: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    minlength: 3
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
  }
})

module.exports = mongoose.model('User', schema)
