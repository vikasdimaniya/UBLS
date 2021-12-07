const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");

let log;
let storage;

function init(core) {
  log = core.log;
  storage = core.storage;

  passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    (email, password, done)=>{
      storage.findUser(email).then((user) => {
        if (user != null) {
          bcrypt.compare(password, user.password).then((validPassword) => {
            if (!validPassword) {
              return done(null, false);
            } else {
              //Autenticated
              return done(null, user);
            }
          });
        } else {
          return done(null, false);
        }
      }).catch((err) => {
        log.error(`Error while finding user:${email} :` + err);
        return done(null, false);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    storage.findUser(email).then((user) => {
      done(null, user);
    });
  });
}

module.exports = { init: init };