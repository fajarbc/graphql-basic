const { Users } = require("../database");

const resolvers = {
  Query: {
    users() {
      return Users;
    },
  },
};

module.exports = { resolvers };
