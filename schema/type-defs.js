const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        active: Boolean!
        gender: Gender!
        age: Int
        weight: Float
        followers: [User]
        following: [User]
    }

    input InputFollow {
        user_id1: ID!
        user_id2: ID!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        follow(input: InputFollow!): User
    }

    enum Gender {
        MALE,
        FEMALE,
    }
`;

module.exports = { typeDefs };
