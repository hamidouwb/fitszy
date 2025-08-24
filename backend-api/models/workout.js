const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
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

module.exports = mongoose.model('Workout', schema)
