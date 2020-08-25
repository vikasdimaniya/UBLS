let db;
let log;

function init(_db, _log) {
  db = _db;
  log = _log;
}
function registerUser(user) {
  log.info("Mongo: Inserting new user email: " + user.email);
}
module.exports = {
  registerUser: registerUser,
  init: init,
};
