const auth = require("./auth");

let log;

//TODO: all other express validator for ALL API
function init(core) {
  log = core.log;

  auth.init(core);
}

module.exports = { init: init, auth: auth };
