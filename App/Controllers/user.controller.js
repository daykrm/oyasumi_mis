const db = require("../Models");
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
const jwt = require("jsonwebtoken");
const User = db.users;

exports.create = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.countDocuments({ username: req.body.username }, function (err, count) {
    if (count > 0) {
      //document exists });
      res.status(400).send({
        message: `Username : ${req.body.username} already exits!`,
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

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ usernotfound: "Username not found !!" });
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          role : user.role
        };

        jwt.sign(
          payload,
          db.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer "+token ,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect !!" });
      }
    });
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
