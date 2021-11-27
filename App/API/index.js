const express = require("express");
const _ = require("lodash");
const router = express.Router();

const middleware = require("./middleware");
const public = require("./public");
const private = require("./private");

let storage;
let settings;
let log;

function init(core) {
  settings = core.settings;
  storage = core.storage;
  log = core.log;
  middleware.init(core);
  
  //TODO: add express validator to validate every api request for correct values and types
  
  //all public routes
  router.use("/", public.router);

  //all private routes
  router.use("/", middleware.auth.authorizeUser, private.router);
}

module.exports = { init: init, router: router };
