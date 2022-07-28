const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// const { nanoid } = require("nanoid");

const adapter = new FileSync("database.json");
const db = low(adapter);

const getUserById = (userId) => {
  const Users = db.get("users").value();
  const index = Users.findIndex((user) => user.id == userId);
  return Users[index];
};
const follow = (userId1, userId2) => {
  // "u1" follows "u2"
  const u1 = db.get("users").find({ id: userId1 });
  const u1Val = { ...u1.value() };
  const u2 = db.get("users").find({ id: userId2 });
  const u2Val = { ...u2.value() };
  if (u1Val === undefined || u2Val === undefined) return null;

  // write "following" to "u1" data
  const following = u1Val.following ?? [];
  delete u2Val["followers"];
  delete u2Val["following"];
  if (following.findIndex((item) => item == u2Val.id) == -1)
    following.push(u2Val.id);
  u1.assign({ following: following }).write();

  // write "followers" to "u2" data
  const followers = u2Val.followers ?? [];
  delete u1Val["followers"];
  delete u1Val["following"];
  if (followers.findIndex((item) => item == u1Val.id) == -1)
    followers.push(u1Val.id);
  u2.assign({ followers: followers }).write();

  return u1.value();
};
const getUserFollowers = (user) => {
  if (!user.followers) return [];

  const result = [];
  user.followers.map((userId) => {
    const user = getUserById(userId);
    if (user) result.push(user);
  });
  return result;
};
const getUserFollowing = (user) => {
  if (!user.following) return [];

  const result = [];
  user.following.map((userId) => {
    const user = getUserById(userId);
    if (user) result.push(user);
  });
  return result;
};
const getPostById = (postId) => {
  const Posts = db.get("posts").value();
  const index = Posts.findIndex((post) => post.id == postId);
  return Posts[index];
};
const getUserPost = (userId) => {
  const Posts = db.get("posts").value();
  let result = [];
  Posts.map((post) => {
    if (post.user == userId) result.push(post);
  });
  return result;
};
const getPostLikes = (ids) => {
  if (!ids) return [];

  const result = [];
  ids.map((id) => {
    const user = getUserById(id);
    if (user) result.push(user);
  });

  return result;
};
const getMostLikedPost = (userId) => {
  const Posts = getUserPost(userId);
  let maxLike = 0;
  let pinnedPost = [];
  if (Posts.length)
    Posts.map((post) => {
      const likes = getPostLikes(post.likes).length;
      if (likes > maxLike) {
        maxLike = likes;
        pinnedPost.push(post);
      }
    });

  return pinnedPost.length > 0 ? pinnedPost[pinnedPost.length - 1] : null;
};

const createUser = (user) => {
    const users = db.get("users").value()
    let id = 1
    if(users.length) id += Number(users[users.length-1].id)
    const result = {id: id.toString(), ...user}
    db.get("users").push(result).write()
    return result
}

const updateUser = (user) => {
    const oldUser = db.get("users").find({id: user.id}).value()
    // return oldUser
    console.log(user);
    const newUser = {...oldUser, ...user}
    db.get("users")
    .find({id: user.id})
    .assign(newUser)
    .write()
    console.log(newUser);

    return user
}

module.exports = {
  db,
  follow,
  getUserById,
  getPostById,
  getUserPost,
  getMostLikedPost,
  getUserFollowers,
  getUserFollowing,
  getPostLikes,
  createUser,
  updateUser,
};
