//NPM MODULES
const mongoose = require("mongoose");

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
      log.info("Connection establised");
      db = mongoose;
    })
    .catch((err) => {
      log.error("Database Connection Error: " + err);
    });
}

module.exports = { init: init };
