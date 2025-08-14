import { ApolloServer }  from '@apollo/server';
import { startStandaloneServer } from'@apollo/server/standalone';
import users from "./mockData.js"


const typeDefs=`
scalar DateTime
scalar ObjectId

# Enums
enum VisibilityStatus {
  PUBLIC
  PRIVATE
}

type User {
  id: ObjectId!
  username: String!
  email: String!

  # Created content
  programs: [Program!]!
  workouts: [Workout!]!
  exercises: [Exercise!]!

  createdAt: DateTime!
  updatedAt: DateTime!
}

type Program {
  id: ObjectId!
  name: String!
  workouts: [Workout!]!

  # Ownership & Privacy
  owner: User!
  visibility: VisibilityStatus!

  createdAt: DateTime!
  updatedAt: DateTime!
}


type Workout {
  id: ObjectId!
  name: String!
  exercises: [Exercise!]!

  # Ownership & Privacy
  owner: User!
  visibility: VisibilityStatus!

  createdAt: DateTime!
  updatedAt: DateTime!
}

type Exercise {
  id: ObjectId!
  name: String!

  # Ownership & Privacy
  owner: User!
  visibility: VisibilityStatus!

  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  userCount: Int!
  allUsers: [User!]!
  findUser(name: String!): User
  programs: [Program!]!
  workouts: [Workout!]!
  exercises: [Exercise!]!
}
`

const resolvers = {
  Query: {
    userCount: () => users.length,
    allUsers: () => users,
    findUser: (_, {name}) => users.find(u => u.username === name),
    programs: () => programs,
    workouts: () => workouts,
    exercises: () => exercises
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
