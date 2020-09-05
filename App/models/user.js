const Joi = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");

let Mongoose;
let settings;

function init(_settings, _mongoose) {
  settings = _settings;
  Mongoose = _mongoose;
}

//schema for user input validation
const UserSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(3).max(256).required().email(),
  password: Joi.string().min(3).max(256).required(),
});

//validation for mongodb
const User = Mongoose.model(
  "User",
  new Mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
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
  requirementCount: 5,
};

function validateUser(user) {
  let { error } = UserSchema.validate(user);
  if (error) {
    return error;
  } else {
    const { error } = passwordComplexity(complexityOptions).validate(
      user.password
    );
    if (error) {
      console.log(error);
      return error;
    } else {
      return false;
    }
  }
}

module.exports = {
  User: User,
  validate: validateUser,
};
