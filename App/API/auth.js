const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");

const { User } = require("../models/user");

let storage;
let settings;
let log;

function init(_settings, _storage) {
  settings = _settings;
  log = settings.log;
  storage = _storage;
}

const UserSchema = Joi.object({
  email: Joi.string().min(3).max(256).required().email(),
  password: Joi.string().min(3).max(256).required(),
});

const complexityOptions = {
  min: 5,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 5,
};

function validate(user) {
  let { error } = UserSchema.validate(user);
  if (error) {
    return error;
  } else {
    const { error } = passwordComplexity(complexityOptions).validate(
      user.password
    );
    if (error) {
      console.log(error);
      return error;
    } else {
      return false;
    }
  }
}

//creating new user or registering
function authenticateUser(req, res) {
  //validation for req.body.user
  //only pick the key which are acceptable. so user can't use api to save some other data.
  const error = validate(_.pick(req.body.user, ["email", "password"]));
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  storage
    .findUser(req.body.email)
    .then((result) => {
      if (result) {
        log.debug(result);
        res.send(result);
      } else {
        res.send({ msg: "No such user" });
      }
    })
    .catch((err) => {
      log.error(`Error while finding user:${req.body.user} :` + err);
    });
}
module.exports = { init: init, authenticateUser: authenticateUser };
