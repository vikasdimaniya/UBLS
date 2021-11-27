const auth = require("./auth");
const user = require("./user");
const validations = require("./validations");

let settings;
let log;

function init(core){
    settings = core._settings;
    log = core.log;
    auth.init(core);
}
module.exports = { init: init };