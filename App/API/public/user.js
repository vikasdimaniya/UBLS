const express = require("express");
const _ = require("lodash");
const router = express.Router();

let runtime;
let log;

function init(core) {
    runtime = core.runtime;
    log = core.log;
    
    //user:{name:"",email="",password=""}

}
module.exports = { init: init, router: router };