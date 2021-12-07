const express = require("express");
const _ = require("lodash");
const router = express.Router();

let runtime;
let log;

function init(core) {
    runtime = core.runtime;
    log = core.log;
    
    router.get("/", runtime.user.getUser);
    router.delete("/", runtime.user.deleteUser);
    router.put("/", runtime.user.updateUser);
}
module.exports = { init: init, router: router };