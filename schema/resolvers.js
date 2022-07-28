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
      const u1 = db.get("users").find({ id: Number(args.input.user_id1) });
      const u1_val = {...u1.value()};
      const u2 = db.get("users").find({ id: Number(args.input.user_id2) });
      const u2_val = {...u2.value()};
      if (u1_val === undefined || u2_val === undefined) return null;

      // write "following" to "u1" data
      const following = u1_val.following ?? [];
      delete u2_val["followers"];
      delete u2_val["following"];
      if(following.findIndex(item => item.id == u2_val.id) == -1) following.push(u2_val);
      u1.assign({ following: following }).write();

      // write "followers" to "u2" data
      const followers = u2_val.followers ?? [];
      delete u1_val["followers"];
      delete u1_val["following"];
      if(followers.findIndex(item => item.id == u1_val.id) == -1) followers.push(u1_val);
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
    user_posts: (_, args) => {
      const Posts = db.get("posts").value();
      let result = []
      Posts.map((post) => {
        if(post.user.id == args.user_id) result.push(post)
      });
      return result;
    },
  },
};

module.exports = { resolvers };
