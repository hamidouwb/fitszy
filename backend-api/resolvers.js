const User = require('./models/user')
const Program = require('./models/program')
const Workout = require('./models/workout')
const Exercise = require('./models/exercise')
const resolvers = {
  Query: {
    userCount: () => users.length,
    allUsers: () => users,
    findUser: (_, {userName}) => users.find(u => u.userName === userName),
    programs: () => programs,
    workouts: () => workouts,
    exercises: () => exercises
  },
  Mutation: {
    createUser: async (root, args) => {
    }
  }
}

