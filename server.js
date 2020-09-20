//NPM MODULES
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

//LOCAL MODULES
const api = require("./App");
const settings = require("./settings");
const config = settings.config;
const log = settings.log;
const app = express();
const port = process.env.PORT || config.get("port");

if (!config.get("jwtPrivateKey")) {
  log.fatal("jwt Private Key not configured in config");
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
app.use(helmet());
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

app.get("/", (req, res) => {
  res.send("Welcome to UBLS" + "try localhost:" + port + "/someValue");
});

app.get("/:val", (req, res) => {
  res.send(
    "Good: " +
      req.params.val +
      " Now try: localhost:" +
      port +
      "/someValue/someOtherValue"
  );
});

app.get("/:val/:val2", (req, res) => {
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
});

process.on("uncaughtException", (err, origin) => {
  log.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});