const { db, follow, getUserById, getPostById, getUserPost, getMostLikedPost, getUserFollowers, getUserFollowing, getPostLikes } = require("../database");
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
  User: {
    followers: (user) => {
      return getUserFollowers(user)
    },
    following: (user) => {
      return getUserFollowing(user)
    },
    mostLikedPost: (user) => {
      return getMostLikedPost(user.id)
    }
  },
  Post: {
    user: (post) => {
      return getUserById(post.user)
    },
    likes: (post) => {
      return getPostLikes(post.likes)
    },
    likesCount: (post) => {
      return getPostLikes(post.likes).length
    }
  }
};

module.exports = { resolvers };
