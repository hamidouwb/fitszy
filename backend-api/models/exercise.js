const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  },
  mediaUrl: {
    type: String,
    minlength: 3
  },
})

// Atlasdb retuns a _id as an object this is to turn it into a string
schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Exercise', schema)
