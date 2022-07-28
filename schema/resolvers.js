const { db } = require("../database");
const fs = require("fs");

const resolvers = {
  Query: {
    users: () => {
      return db.get("users").value();
    },
    user: (_, args) => {
      const Users = db.get("users").value();
      const index = Users.findIndex((user) => user.id == args.id);
      return Users[index];
    },
    follow: (_, args) => {
      // "u1" follows "u2"
      const u1 = db.get("users").find({ id: Number(args.input.userId1) });
      const u1Val = {...u1.value()};
      const u2 = db.get("users").find({ id: Number(args.input.userId2) });
      const u2Val = {...u2.value()};
      if (u1Val === undefined || u2Val === undefined) return null;

      // write "following" to "u1" data
      const following = u1Val.following ?? [];
      delete u2Val["followers"];
      delete u2Val["following"];
      if(following.findIndex(item => item.id == u2Val.id) == -1) following.push(u2Val);
      u1.assign({ following: following }).write();

      // write "followers" to "u2" data
      const followers = u2Val.followers ?? [];
      delete u1Val["followers"];
      delete u1Val["following"];
      if(followers.findIndex(item => item.id == u1Val.id) == -1) followers.push(u1Val);
      u2.assign({ followers: followers }).write();

      return u1.value();
    },
    posts: () => {
      return db.get("posts").value();
    },
    post: (_, args) => {
      const Posts = db.get("posts").value();
      const index = Posts.findIndex((post) => post.id == args.id);
      return Posts[index];
    },
    userPosts: (_, args) => {
      const Posts = db.get("posts").value();
      let result = []
      Posts.map((post) => {
        if(post.user.id == args.userId) result.push(post)
      });
      return result;
    },
  },
};

module.exports = { resolvers };
