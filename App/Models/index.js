const mongoose = require("mongoose");
const dbConfig = require("../Config/db.config");

mongoose.Promise = global.Promise;

const db = {
  url: dbConfig.url,
  mongoose: mongoose,
  users: require("./user.model")(mongoose),
};

module.exports = db;
