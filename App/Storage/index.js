//NPM MODULES
const mongoose = require("mongoose");
const user = require("../storage/user");

//LOCAL MODULES
let settings;
let log;
let config;
let db;

//LOCAL FUNCTIONS

//EXPORTED FUNCTIONS
function init(_settings) {
  settings = _settings;
  log = _settings.log;
  config = _settings.config;
  log.info(config.databaseURI);
  mongoose
    .connect(config.databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database Connection establised");
      db = mongoose;
    })
    .then(() => {
      user.init(db, log);
    })
    .catch((err) => {
      log.error("Database Connection Error: " + err);
    });
}

module.exports = { init: init, registerUser: user.registerUser };
