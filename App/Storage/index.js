//NPM MODULES
const mongoose = require("mongoose");
const user = require("./user");

//LOCAL MODULES
let settings;
let log;
let config;
let db;

//LOCAL FUNCTIONS

//EXPORTED FUNCTIONS
function init(core) {
  settings = core.settings;
  log = core.log;
  config = core.config;
  log.info(config.databaseURI);
  mongoose
    .connect(config.databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: false,
      sslValidate: false
    })
    .then(() => {
      log.info("Database Connection establised");
      db = mongoose;
    })
    .then(() => {
      //i
      user.init(core, db);
    })
    .catch((err) => {
      log.error("Database Connection Error: ");
      log.error(err);
      log.info("Exiting application....");
      process.exit(1);
    });
}

module.exports = {
  init: init,
  saveUser: user.saveUser,
  findUser: user.findUser,
};
