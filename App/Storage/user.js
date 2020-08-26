const Promise = require("bluebird");

let db;
let log;

function init(_db, _log) {
  db = _db;
  log = _log;
}
function registerUser(user) {
  return new Promise((resolve, reject) => {
    user.save().then(
      (val) => {
        log.info("Registred New User: " + user);
      },
      (err) => {
        if (
          err &&
          err.hasOwnProperty("name") &&
          err.name == "MongoError" &&
          err.hasOwnProperty("code") &&
          err.code == "11000"
        ) {
          log.info("User already exists");
          return resolve();
        } else {
          log.error("Mongo: Error while registering new user");
          return reject(err);
        }
      }
    );
  });
}
module.exports = {
  registerUser: registerUser,
  init: init,
};
