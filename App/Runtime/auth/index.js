const local = require("./local");
const google  =  require("./google");
const localStrategy = require("./localStrategy");

let log;

function init(core){
    log = core.log;
    //local.init(core);
    google.init(core);
    localStrategy.init(core);
}
module.exports = { init: init, local: local};