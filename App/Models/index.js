const mongoose = require("mongoose");
const dbConfig = require("../Config/db.config");

mongoose.Promise = global.Promise;

const db = {
  url: dbConfig.url,
  secretOrKey : dbConfig.secretOrKey,
  mongoose: mongoose,
  users: require("./users.model"),
};

module.exports = db;
