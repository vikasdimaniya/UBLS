const auth = require("./auth");
const user = require("./user");

let log;

function init(core){
    log = core.log;
    auth.init(core);
    user.init(core);
}
module.exports = { init: init, auth: auth, user: user };