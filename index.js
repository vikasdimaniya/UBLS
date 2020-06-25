//NPM MODULES
const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

//LOCAL MODULES
const Logger = require("./log");
const user = require("./routes/user");
const authenticate = require("./routes/authenticate");

//CLASS DEFINATIONS
let log1 = new Logger(config);
let log = log1.getLogger();
//console.log(log);
const app = express();
const port = process.env.PORT || config.get("port");
app.listen(port, () => log.info(`Listening on port: ${port}`));

log.info(
  config.get("name") + " is starting in " + app.get("env") + " environment"
);

//SETTING MIDDLEWARE FOR EXPRESS
app.use(helmet());
app.use(express.json());
//******************This is a Custom Middleware********************* */
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
app.use("/api/user", user);

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
