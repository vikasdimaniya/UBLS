const express = require("express");
const router = express.Router();

let users = ["user1", "user2"];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  users.push(req.body.name);
  res.send(users);
});

module.exports = router;
