const Joi = require("@hapi/joi");
const user = require("../user");

let Mongoose;
let settings;
let User;

function init(_settings, _mongoose) {
  settings = _settings;
  Mongoose = _mongoose;
  User = Mongoose.model(
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
}

function getUser() {
  return User;
}

module.exports = {
  init: init,
  getUser: getUser,
};
