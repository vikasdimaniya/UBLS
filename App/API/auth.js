const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");

const { User, validate } = require("../models/user");
const storage = require("../Storage");

//creating new user or registering
function authenticateUser(req, res) {
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
module.exports = { authenticateUser: authenticateUser };
