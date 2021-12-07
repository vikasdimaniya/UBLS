const _ = require("lodash");
const jwt = require("jsonwebtoken");
const validations = require("./validations");

let log;

let storage;

let users = [
  { name: "user1", password: "Qweasd1." },
  { name: "user2", password: "Qweasd1." },
];

function init(core) {
  
  storage = core.storage;
  log =  core.log;
}
//modify this function to find details of some specific user based on some property like email
//currently it simply return the current user details
function getUser(req, res, next) {
  const error = validations.validateUserEmail(_.pick(req.user, ["email"]));
  if (error != true) {
    log.error(error);
    return res.status(400).send("No such User Exists");
  }
  storage
    .findUser(req.user.email)
    .then((user) => {
      if (user) {
        res.send(_.pick(user, ["name", "email"]));
      } else {
        res.status(400).send("User Not found");
      }
    })
    .catch((err) => {
      next(err);
    });
}

//creating new user or registering
/**
 * req.body should contain name, email and password
 * res will contain only name and email and header will have jwt token "x-auth-token"
 */


function deleteUser(req, res, next) {
  try {
    users.every((user, index) => {
      if (user.name === req.body.name) {
        users.splice(index, 1);
        return false;
      } else {
        return true;
      }
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
}

//To update a user details
function updateUser(req, res, next) {
  //validation for req.body
  try {
    const error = validateUser(req.body);
    if (!error) {
      res.status(400).send(error.details[0].message);
    }
    console.log("edit added: ", req.body);
    if (user.name === req.body.name) {
      users.password = req.body.password;
      res.send(users);
    } else {
      res.status(400).send({ error: "Email or password is wrong" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  init: init,
  getUser: getUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
