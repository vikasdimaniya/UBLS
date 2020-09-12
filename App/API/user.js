const _ = require("lodash");

const validations = require("./validations");

let log;
let settings;
let storage;

let users = [
  { name: "user1", password: "Qweasd1." },
  { name: "user2", password: "Qweasd1." },
];

function init(_settings, _storage) {
  settings = _settings;
  storage = _storage;
  log = settings.log;
}

function getAllUsers(req, res) {
  res.send(users);
}

//creating new user or registering
function registerUser(req, res) {
  //validation for req.body.user
  //only pick the key which are acceptable. so user can't use api to save some other data.
  const error = validations.validate(
    _.pick(req.body.user, ["name", "email", "password"])
  );
  if (error != true) {
    log.error(error);
    return res.status(400).send({ error: error.details[0].message });
  }
  storage
    .saveUser(_.pick(req.body.user, ["name", "email", "password"]))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      log.error("error" + err);
      res.status(400).send({
        error: `Couldn't create User with email ${req.body.user.email}`,
      });
    });
  //Later will send JWT insted of users object.
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

//To update a user details
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
  init: init,
  getAllUsers: getAllUsers,
  registerUser: registerUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
