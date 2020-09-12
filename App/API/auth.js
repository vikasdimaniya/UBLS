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
  //validation for req.body.user
  //only pick the key which are acceptable. so user can't use api to save some other data.
  const error = validations.validateUserWoPass(
    _.pick(req.body.user, ["email", "password"])
  );
  if (error != true) {
    return res.status(400).send({ error: error.details[0].message });
  }
  log.info("searching for user with email: " + req.body.user.email);
  storage
    .findUser(req.body.user.email)
    .then((result) => {
      if (result != null) {
        log.debug(result);
        res.send(result);
      } else {
        res.send({ msg: "No such user" });
      }
    })
    .catch((err) => {
      log.error(`Error while finding user:${req.body.user} :` + err);
    });
}
module.exports = { init: init, authenticateUser: authenticateUser };
