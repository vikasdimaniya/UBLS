const express = require("express");
const _ = require("lodash");
const router = express.Router();
  
const user = require("./user");

let middleware;

function init(core) {
    user.init(core);
    middleware = core.middleware;
    router.use("/user", user.router);
}

module.exports = { init: init, router: router };