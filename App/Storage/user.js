const bcrypt = require("bcrypt");
const Promise = require("bluebird");

let db;
let log;
let settings;

const UserModel = require("./models/user");
function init(core, _db) {
  settings = core.settings;
  log = core.log;
  db = _db;
  UserModel.init(settings, db);
}
function saveUser(user) {
  return new Promise((resolve, reject) => {
    const User = UserModel.getUser();
    user = new User(user);
    bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(user.password, salt);
      })
      .then((pass) => {
        user.password = pass;
        return user.save();
      })
      .then((val) => {
        return resolve(val);
      })
      .catch((err) => {
        log.error("error" + err);
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
function findUser(email) {
  return new Promise((resolve, reject) => {
    const User = UserModel.getUser();
    log.info("searching for user with email: " + email);
    User.findOne({ email: email })
      .then((user) => {
        log.info("Search result" + user);
        return resolve(user);
      })
      .catch((err) => {
        log.error(`Mongo: Error while serching for user email: ${email}`);
        return reject(err);
      });
  });
}
module.exports = {
  saveUser: saveUser,
  init: init,
  findUser: findUser,
};
