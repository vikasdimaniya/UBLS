const bcrypt = require("bcrypt");
const _ = require("lodash");
const validations = require("./validations");

let storage;
let settings;
let log;

function init(_settings, _storage) {
  settings = _settings;
  log = settings.log;
  storage = _storage;
}

//creating new user or registering
function authenticateUser(req, res) {
  //validation for req.body
  //only pick the key which are acceptable. so user can't use api to save some other data.
  const error = validations.validateUserWoPass(
    _.pick(req.body, ["email", "password"])
  );
  if (error != true) {
    return res.status(400).send({ error: error.details[0].message });
  }
  log.info("searching for user with email: " + req.body.email);
  storage
    .findUser(req.body.email)
    .then((user) => {
      if (user != null) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((validPassword) => {
            if (!validPassword) {
              res.status(400).send({ msg: "Invalid User or Password" });
            } else {
              //Autenticated
              const token = user.generateAuthToken();
              res.send(token);
            }
          });
      } else {
        res.status(400).send({ msg: "Invalid User or Password" });
      }
    })
    .catch((err) => {
      log.error(`Error while finding user:${req.body} :` + err);
      res
        .status(400)
        .send({ msg: "Something went wrong! Probably not from your side." });
    });
}
module.exports = { init: init, authenticateUser: authenticateUser };
