const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        active: Boolean!
        age: Int
        weight: Float
    }

    type Query {
        users: [User!]!
    }
`;

module.exports = { typeDefs };
