const API = require("./API");
const storage = require("./Storage");

function init(settings) {
  storage.init(settings);
  API.init(settings, storage);
}
module.exports = { init: init, router: API.router };
