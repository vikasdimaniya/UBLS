const jwt = require("jsonwebtoken");

let Mongoose;

let config;
let User;

function init(core, _mongoose) {
  
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
  //TODO: store JWTs inside an httpOnly cookie
  User.prototype.generateAuthToken = function () {
    const token = jwt.sign(
      { _id: this._id, email: this.email, name: this.name },
      config.get("jwtPrivateKey")
    );
    return token;
  };
}

function getUser() {
  return User;
}

module.exports = {
  init: init,
  getUser: getUser,
};
