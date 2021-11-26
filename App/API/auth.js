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
function authenticateUser(req, res, next) {
  //validation for req.body
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
    .then((user) => {
      if (user != null) {
        bcrypt
          .compare(req.body.user.password, user.password)
          .then((validPassword) => {
            if (!validPassword) {
              res.status(400).send({ msg: "Invalid User or Password" });
            } else {
              //Autenticated
              res.header("x-auth-token", user.generateAuthToken()).send(_.pick(user, ["name", "email"]));
              //to set cookies
              // var cookie = req.cookies.JWTtoken;
              // if (cookie === undefined) {
              //   // no: set a new cookie
              //   try{
              //     res.cookie('JWTtoken',user.generateAuthToken(), { maxAge: 900000, httpOnly: true });
              //   }catch(err){
              //     log.debug(err);
              //   }
              //   log.debug('cookie created successfully');
              // } else {
              //   // yes, cookie was already present 
              //   log.debug('cookie exists', cookie);
              // } 
              //res.send({authenticated:true});
              next();
            }
          });
      } else {
        res.status(400).send({ msg: "Invalid User or Password" });
      }
    })
    .catch((err) => {
      log.error(`Error while finding user:${req.body.user} :` + err);
      res
        .status(400)
        .send({ msg: "Something went wrong! Probably not from your side." });
    });
}

function verifyJWT(req, res, next) {
  //validation for req.body
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
    .then((user) => {
      if (user != null) {
        bcrypt
          .compare(req.body.user.password, user.password)
          .then((validPassword) => {
            if (!validPassword) {
              res.status(400).send({ msg: "Invalid User or Password" });
            } else {
              //Autenticated]
              var cookie = req.cookies.JWTtoken;
              if (cookie === undefined) {
                // no: set a new cookie
                try{
                  res.cookie('JWTtoken',user.generateAuthToken(), { maxAge: 900000, httpOnly: true });
                }catch(err){
                  log.debug(err);
                }
                log.debug('cookie created successfully');
              } else {
                // yes, cookie was already present 
                log.debug('cookie exists', cookie);
              } 
              //res.send({authenticated:true});
              next();
            }
          });
      } else {
        res.status(400).send({ msg: "Invalid User or Password" });
      }
    })
    .catch((err) => {
      log.error(`Error while finding user:${req.body.user} :` + err);
      res
        .status(400)
        .send({ msg: "Something went wrong! Probably not from your side." });
    });
}
module.exports = { init: init, authenticateUser: authenticateUser };
