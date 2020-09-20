const express = require("express");
const _ = require("lodash");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const middleware = require("./middleware/auth");

let storage;
let settings;

function init(_settings, _storage) {
  settings = _settings;
  storage = _storage;
  user.init(settings, _storage);
  auth.init(settings, _storage);
  middleware.init(settings);
}

//user:{name:"",email="",password=""}
router.post("/user", user.registerUser);
router.get("/user", middleware.authorizeUser, user.getUser);
router.delete("/user", user.deleteUser);
router.put("/user", user.updateUser);

//user:{email="",password=""}
router.post("/auth", auth.authenticateUser);

module.exports = { init: init, router: router };
