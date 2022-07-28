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
        mostLikedPost: Post
    }

    type Post {
        id: ID!
        type: PostType!
        url: String!
        description: String
        user: User!
        likes: [User!]!
        likesCount: Int
    }

    input InputFollow {
        userId1: ID!
        userId2: ID!
    }

    input inputUser {
        name: String!
        active: Boolean = true
        gender: Gender = MALE
        age: Int
        weight: Float
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        follow(input: InputFollow!): User
        posts: [Post!]!
        post(id: ID!): Post!
        userPosts(userId: ID!): [Post!]!
    }

    type Mutation {
        createUser(user: inputUser!): User!
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
