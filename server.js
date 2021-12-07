//NPM MODULES
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require('cookie-parser');
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require('express-session');
const passport = require('passport');
const Logger = require("./log");
const config = require("config");

let logger = new Logger(config);
let log = logger.getLogger();

let core={}
core.config = config;
core.log = log;

//LOCAL MODULES
const api = require("./App");
const app = express();
const port = process.env.PORT || config.get("port");


if(process.env.SESSION_SECRET === undefined) {
  log.fatal("SESSION_SECRET missing from env, exiting with code 1.");
  process.exit(1);
}

//TODO: using redis for session storage
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
api.init(core);
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
app.use("/", api.router);

app.get("/", (req, res, next) => {
  try {
    res.redirect("/index.html")
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  log.error(err);
  res.status(500).send("Internal error. Try again after sometime.");
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
