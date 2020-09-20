const jwt = require("jsonwebtoken");
let settings;
let log;
function init(_settings) {
  settings = _settings;
  log = settings.log;
}
function authorizeUser(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, settings.config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
    log.error(err);
  }
}
module.exports = {
  init: init,
  authorizeUser: authorizeUser,
};
