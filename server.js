//NPM MODULES
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require('cookie-parser');
const express = require("express");
const googleAuth = require('./App/API/googleAuth');
const helmet = require("helmet");
const morgan = require("morgan");
const session = require('express-session');
const passport = require('passport');


//LOCAL MODULES
const api = require("./App");
const settings = require("./settings");
const config = settings.config;
const log = settings.log;
const app = express();
const port = process.env.PORT || config.get("port");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
if(process.env.SESSION_SECRET === undefined) {
  log.fatal("SESSION_SECRET missing from env, exiting with code 1.");
  process.exit(1);
}

//PASSPORT
googleAuth.init(settings);
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (!config.get("jwtPrivateKey")) {
  log.fatal("jwt Private Key not configured in config");
  log.info("Exiting application....");
  process.exit(1);
}

//CLASS DEFINATIONS
if (config.get("console-silent")) {
  log.conf("Console logs are Silent");
  log.transports[2].silent = true;
} else {
  console.log("Console logs are On");
}
api.init(settings);
app.listen(port, () => log.conf(`Listening on port: ${port}`));
log.info(
  config.get("name") + " is starting in " + app.get("env") + " environment"
);

//SETTING MIDDLEWARE FOR EXPRESS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
if(config.get("EnableSecurityInDev") === true && app.get("env")=="production"){
  app.use(helmet());
  app.use(compression());
}
app.use(express.json());
//******************This is A DEMO of Custom Middleware function********************* */
/*
app.use(customMiddleware);
function customMiddleware(req, res, next) {
  log.info("custom middleware");
  next();
}
*/
if (config.get("extended-urlEnconded")) {
  log.conf("Extended url encoding enabled");
  app.use(express.urlencoded({ extended: true }));
} else app.use(express.urlencoded());
//To serve static files
if (config.get("serveStaticFiles")) app.use(express.static("public"));
//for HTTP request logging
if (config.get("useMorgan")) app.use(morgan("tiny"));

//API CALLS
app.use("/api", api.router);

app.get("/", (req, res, next) => {
  try {
    res.send("<p>Welcome to UBLS" + "try localhost:" + port + "</p>"
      +'<a href="/auth/google">Authenticate with Google</a>'
    );
  } catch (err) {
    next(err);
  }
});
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get("/:val", (req, res, next) => {
  try {
    res.send(
      "Good: " +
        req.params.val +
        " Now try: localhost:" +
        port +
        "/someValue/someOtherValue"
    );
  } catch (err) {
    next(err);
  }
});

app.get("/:val/:val2", (req, res, next) => {
  try {
    res.send(
      "Good: " +
        "value 1: " +
        req.params.val +
        " value 2: " +
        req.params.val2 +
        " Now try: localhost:" +
        "Query" +
        req.query +
        port +
        "/someValue/someOtherValue?sortBy=name"
    );
  } catch (err) {
    next(err);
  }
});
app.post("/abc", (req, res, next) => {
  try {
    console.log("Good:",req.body())
    res.send(
      "Good:"+req.body
    );
  } catch (err) {
    next(err);
  }
});
app.use((err, req, res, next) => {
  log.error(err);
  res.status(500).send("Internal error. Try again after sometime");
});
process.on("uncaughtException", (err, origin) => {
  log.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  process.exit(1);
});
process.on("unhandledRejection", (err, origin) => {
  log.error(
    `Caught unhandled Rejection: ${err}\n` + `Exception origin: ${origin}`
  );
  process.exit(1);
});
