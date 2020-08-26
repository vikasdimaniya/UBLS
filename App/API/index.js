const express = require("express");
const _ = require("lodash");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const storage = require("../Storage");

let settings;
function init(_settings) {
  settings = _settings;
}
user.init(storage);

router.get("/user", user.getAllUsers);
router.post("/user", user.registerUser);
router.delete("/user", user.deleteUser);
router.put("/user", user.updateUser);

router.post("/auth", auth.authenticateUser);

module.exports = { init: init, router: router };
