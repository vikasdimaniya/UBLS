const express = require("express");
const _ = require("lodash");
const router = express.Router();

const app = require("../../server");
const middleware = require("./middleware");
const public = require("./public");
const private = require("./private");

let storage;
let log;

function init(core) {
  
  storage = core.storage;
  log = core.log;
  middleware.init(core);
  core.middleware = middleware;
  public.init(core);
  private.init(core);
  //TODO: add express validator to validate every api request for correct values and types
  
  //all public routes
  router.use("/", public.router);

  //all private routes
  router.use("/api", middleware.auth.isLoggedIn, private.router);
}

module.exports = { init: init, router: router };
