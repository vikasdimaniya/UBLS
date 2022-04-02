const API = require("./API");
const storage = require("./Storage");
const runtime = require("./Runtime");
const cache = require("./cache");

function init(core) {
  storage.init(core);
  core.storage = storage;
  cache.init(core);
  runtime.init(core);
  core.runtime=runtime;
  
  API.init(core);
}
module.exports = { init: init, router: API.router };
