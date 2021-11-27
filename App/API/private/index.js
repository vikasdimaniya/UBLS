const express = require("express");
const _ = require("lodash");
const router = express.Router();

const user = require("./user");

function init(core) {
    user.init(core);
    router.use("/user",user.router);
}

module.exports = { init: init, router: router };