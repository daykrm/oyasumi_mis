require("dotenv").config();
module.exports = {
  url: "mongodb://localhost:27017/oyasumi_mis",
  secretOrKey: process.env.SECRET,
};
