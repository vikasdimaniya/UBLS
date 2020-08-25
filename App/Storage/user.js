let db;
let log;

function init(_db, _log) {
  db = _db;
  log = _log;
}
function registerUser(user) {
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
        log.error("User already exists");
      } else {
        log.error("Mongo: Error while registering new user :" + err);
        console.log(JSON.stringify(err));
      }
    }
  );
}
module.exports = {
  registerUser: registerUser,
  init: init,
};
