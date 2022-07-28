const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("database.json");
const db = low(adapter);

module.exports = {
  db,
  getUserById: (userId) => {
    const Users = db.get("users").value();
    const index = Users.findIndex((user) => user.id == userId);
    return Users[index];
  },
  follow: (userId1, userId2) => {
      // "u1" follows "u2"
      const u1 = db.get("users").find({ id: Number(userId1) });
      const u1Val = {...u1.value()};
      const u2 = db.get("users").find({ id: Number(userId2) });
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
  getPostById: (postId) => {
    const Posts = db.get("posts").value();
    const index = Posts.findIndex((post) => post.id == postId);
    return Posts[index];
  },
  getUserPost: (userId) => {
    const Posts = db.get("posts").value();
    let result = [];
    Posts.map((post) => {
      if (post.user.id == userId) result.push(post);
    });
    return result;
  },
};
