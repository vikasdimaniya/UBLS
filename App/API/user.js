const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validate } = require("../models/user");
const storage = require("../Storage");

let settings;
let users = [
  { name: "user1", password: "Qweasd1." },
  { name: "user2", password: "Qweasd1." },
];

function init(_settings) {
  settings = _settings;
}

function getAllUsers(req, res) {
  res.send(users);
}

//creating new user or registering
function registerUser(req, res) {
  //validation for req.body.user
  //only pick the key which are acceptable. so user can't use api to save some other data.
  const error = validate(_.pick(req.body.user, ["name", "email", "password"]));
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  } else {
    let user = new User(_.pick(req.body.user, ["name", "email", "password"]));
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(user.password, salt).then((pass) => {
        user.password = pass;
        storage
          .registerUser(user)
          .then(() => {
            res.send(user);
          })
          .catch((err) => {
            res.status(400).send({ error: "Couldn't create User" });
          });
      });
    });
    //Later will send JWT insted of users object.
  }
}

function deleteUser(req, res) {
  users.every((user, index) => {
    if (user.name === req.body.user.name) {
      users.splice(index, 1);
      return false;
    } else {
      return true;
    }
  });
  res.send(users);
}

//To edit a user
function updateUser(req, res) {
  //validation for req.body.user
  const error = validateUser(req.body.user);
  if (!error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("edit added: ", req.body);
  if (user.name === req.body.user.name) {
    users.password = req.body.user.password;
    res.send(users);
  } else {
    res.status(400).send({ error: "Email or password is wrong" });
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  registerUser: registerUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
