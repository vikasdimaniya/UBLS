const express = require("express");
const _ = require("lodash");
const router = express.Router();

const auth = require("./auth");
//const user = require("./user");

function init(core) {
    user.init(core);
    auth.init(core);
    
    router.use("/auth", auth.router)
    //router.use("/user", user.router)
}

module.exports = { init: init, router: router };