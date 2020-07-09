//NPM MODULES
const mongoose = require("mongoose");

//LOCAL MODULES
let settings;
let log;
let config;

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
    .then((res) => {
      if (res) {
        log.info(res);
        log.info("Connection establised");
      }
    })
    .catch((err) => {
      log.error(err);
    });
}

module.exports = { init: init };
