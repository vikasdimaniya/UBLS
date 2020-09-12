const Joi = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");

//schema for user input validation
const UserSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(3).max(256).required().email(),
  password: Joi.string().min(3).max(256).required(),
});
const UserSchemaWoPass = Joi.object({
  email: Joi.string().min(3).max(256).required().email(),
  password: Joi.string().min(3).max(256).required(),
});
//validation for mongodb

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
      return error;
    } else {
      return true;
    }
  }
}
function validateUserWoPass(user) {
  let { error } = UserSchemaWoPass.validate(user);
  if (error) {
    return error;
  } else {
    const { error } = passwordComplexity(complexityOptions).validate(
      user.password
    );
    if (error) {
      return error;
    } else {
      return true;
    }
  }
}

module.exports = {
  validate: validateUser,
  validateUserWoPass: validateUserWoPass,
};
