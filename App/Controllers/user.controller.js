const db = require("../Models");
const User = db.users;
const hash = require("object-hash");

exports.create = (req, res) => {
  //Validate
  if (
    !req.body.fname ||
    !req.body.lname ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).send({ message: `The field cannot be empty !!` });
    return;
  }

  //Create new user
  const user = new User({
    name: { first: req.body.fname, last: req.body.lname },
    username: req.body.username,
    password: hash(req.body.password),
    role: req.body.role,
  });

  //Save to DB
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findAll = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
