const db = require("../Models");
const User = db.users;

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

  User.countDocuments({ username: req.body.username }, function (err, count) {
    if (count > 0) {
      //document exists });
      res.status(400).send({
        message: `This username : ${req.body.username} already taken!`,
      });
      return;
    } else {
      //Create new user
      const user = new User({
        name: { first: req.body.fname, last: req.body.lname },
        username: req.body.username,
        password: req.body.password,
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
    }
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

exports.fineOne = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) throw err;

    user.comparePassword("1234", function (err, isMatch) {
      if (err) throw err;

      res.send({ message: `1234 : ${isMatch}` });
      console.log("1234:", isMatch); // -&gt; Password123: true
    });
  });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Rows were deleted`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
