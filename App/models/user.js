const express = require("express");
const Joi = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");
const { Mongoose } = require("mongoose");

//schema for user input validation
const UserSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(3).max(256).required().email(),
});

//validation for mongodb
const User = Mongoose.model(
  "User",
  new Mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

const complexityOptions = {
  min: 5,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

function validateUser(user) {
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

module.exports = {
  User: User,
  validate: validateUser,
};
