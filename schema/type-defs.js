const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        active: Boolean!
        gender: Gender!
        age: Int
        weight: Float
        followers: [User!]
        following: [User!]
    }

    type Post {
        id: ID!
        type: PostType!
        url: String!
        description: String
        user: User!
        likes: [User!]
    }

    input InputFollow {
        user_id1: ID!
        user_id2: ID!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        follow(input: InputFollow!): User
        posts: [Post!]!
        post(id: ID!): Post!
        user_posts(user_id: ID!): [Post!]!
    }

    enum Gender {
        MALE,
        FEMALE,
    }

    enum PostType {
        PHOTO,
        VIDEO,
    }
`;

module.exports = { typeDefs };
