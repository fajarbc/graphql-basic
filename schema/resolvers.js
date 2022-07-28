const { db, follow, getUserById, getPostById, getUserPost } = require("../database");
const fs = require("fs");

const resolvers = {
  Query: {
    users: () => {
      return db.get("users").value();
    },
    user: (_, args) => {
      return getUserById(args.id)
    },
    follow: (_, args) => {
      // "u1" follows "u2"
      return follow(args.input.userId1, args.input.userId2)
    },
    posts: () => {
      return db.get("posts").value();
    },
    post: (_, args) => {
      return getPostById(args.id)
    },
    userPosts: (_, args) => {
      return getUserPost(args.userId)
    },
  },
};

module.exports = { resolvers };
