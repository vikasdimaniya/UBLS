const express = require("express");
const Joi = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");
const router = express.Router();

//schema
const UserSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};
let users = [
  { name: "user1", password: "Qweasd1." },
  { name: "user2", password: "Qweasd1." },
];

router.get("/", (req, res) => {
  res.send(users);
});

function validateNewUser(user) {
  let { error } = passwordComplexity(complexityOptions).validate(user.password);
  //if there is no error
  if (!error) {
    const { error } = UserSchema.validate(user).error.details[0].message();
    //if there is no error
    if (!error) {
      return true;
    } else {
      return error;
    }
  } else {
    return error;
  }
}

router.post("/", (req, res) => {
  //validation for req.body.user
  const { error } = validateNewUser(req.body.user);
  if (!error) {
    console.log("user added: ", req.body);
    users.push(req.body.user);
    //Later will send JWT insted of users object.
    res.send(users);
  } else {
    res.status(400).send(error.details[0].message);
  }
});
router.delete("/", (req, res) => {
  users.every((user, index) => {
    if (user.name === req.body.user.name) {
      users.splice(index, 1);
      return false;
    } else {
      return true;
    }
  });
  res.send(users);
});

module.exports = router;
