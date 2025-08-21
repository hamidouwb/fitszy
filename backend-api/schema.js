const typeDefs=`
  type User {
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    programs: [Program!]!
    avatarUrl: String
    id: ID!
  }

  type Program {
    name: String!
    title: String!
    description: String!
    workouts: [Workout!]!
    mediaUrl: String
    id: ID!
  }

  type Workout {
    name: String!
    title: String!
    description: String!
    exercise: [Exercise!]!
    mediaUrl: String
    id: ID!
  }

  type Exercise {
    name: String!
    title: String!
    description: String!
    mediaUrl: String
    id: ID!
  }

  type Query {
    userCount: Int!
    allUsers: [User!]!
    findUser(name: String!): User
    programs: [Program!]!
    workouts: [Workout!]!
    exercises: [Exercise!]!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      avatarUrl: String
    ): User
  }
`
module.exports = typeDefs
