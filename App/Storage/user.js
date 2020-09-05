const Promise = require("bluebird");

let db;
let log;
let settings;
const { User } = require("../models/user");
const mongoose = require("mongoose");
function init(_settings, _db) {
  settings = _settings;
  log = _settings.log;
  db = _db;
}
function registerUser(user) {
  return new Promise((resolve, reject) => {
    user
      .save()
      .then((val) => {
        log.info("Registred New User: " + user);
      })
      .catch((err) => {
        if (
          err &&
          err.hasOwnProperty("name") &&
          err.name == "MongoError" &&
          err.hasOwnProperty("code") &&
          err.code == "11000"
        ) {
          log.info(`User already exists with email ${user.email}`);
          return resolve();
        } else {
          log.error(
            `Mongo: Error while registering new user with email ${user.email}`
          );
          return reject(err);
        }
      });
  });
}
/**
 * email
 */
function findUser(_email) {
  return new Promise((resolve, reject) => {
    // User.findOne({ email: _email })
    //   .then((user) => {
    //     return resolve(user);
    //   })
    User.find()
      .then((users) => {
        return resolve(users);
      })
      .catch((err) => {
        log.error(
          `Mongo: Error while serching for user email: ${email} with error:` +
            error
        );
        return reject();
      });
  });
}
module.exports = {
  registerUser: registerUser,
  init: init,
  findUser: findUser,
};
