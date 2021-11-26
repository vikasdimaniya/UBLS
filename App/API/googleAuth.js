const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

let GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET;
let settings;
let log;

function init(_settings) {
  settings = _settings;
  log = settings.log;

  if(process.env.GOOGLE_CLIENT_ID!=undefined){
    console.log("Found GOOGLE_CLIENT_ID in env")
    GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  }else{
    console.log("GOOGLE_CLIENT_ID missing from env, exiting with code 1.");
    process.exit(1);
  }
  if(process.env.GOOGLE_CLIENT_SECRET!=undefined){
      console.log("Found GOOGLE_CLIENT_SECRET in env")
      GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  }else{
    console.log("GOOGLE_CLIENT_SECRET missing from env, exiting with code 1.");
    process.exit(1);
  }
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}

module.exports = { init: init };