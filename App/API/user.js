const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/user");
const storage = require("../Storage");
let users = [
  { name: "user1", password: "Qweasd1." },
  { name: "user2", password: "Qweasd1." },
];

router.get("/", (req, res) => {
  res.send(users);
});

//creating new user or registering
router.post("/", (req, res) => {
  //validation for req.body.user
  const error = validate(_.pick(req.body.user, ["name", "email", "password"]));
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    let user = new User(_.pick(req.body.user, ["name", "email", "password"]));
    storage.registerUser(user);
    //Later will send JWT insted of users object.
    res.send(user);
  }
});

router.delete("/", (req, res) => {
  users.every((user, index) => {
    if (user.name === req.body.user.name) {
      users.splice(index, 1);
      return false;
    } else {
      return true;
    }
  });
  res.send(users);
});

//To edit a user
router.put("/", (req, res) => {
  //validation for req.body.user
  const error = validateUser(req.body.user);
  if (!error) {
    res.status(400).send(error.details[0].message);
  }
  console.log("edit added: ", req.body);
  if (user.name === req.body.user.name) {
    users.password = req.body.user.password;
    return false;
  } else {
    return true;
  }
  res.send(users);
});

module.exports = router;
