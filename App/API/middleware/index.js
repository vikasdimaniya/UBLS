const express = require("express");
const _ = require("lodash");
const router = express.Router();

const auth = require("./auth");

let log;

function init(core) {
  log = core.log;
  
  auth.init(core);
}

module.exports = { init: init, auth: auth };
