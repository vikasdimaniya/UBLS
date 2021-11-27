const API = require("./API");
const storage = require("./Storage");
const runtime = require("./Runtime");

function init(core) {
  storage.init(core);
  core.storage=storage;

  runtime.init(core);
  core.runtime=runtime;
  
  API.init(core);
}
module.exports = { init: init, router: API.router };
