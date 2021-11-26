const jwt = require("jsonwebtoken");
let settings;
let storage;
let log;
function init(_settings, _storage) {
  settings = _settings;
  storage = _storage;
  log = settings.log;
}
function authorizeUser(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, settings.config.get("jwtPrivateKey"));
    //verified User because it might be deleted and old jwt is used to verify auth
    storage.findUser(decoded.email).then((user)=>{
      log.info(user);
      //TODO: decoded.iat should not exceed 3 months,
      req.user = decoded;
      next();
    }).catch((err)=>{
      log.error(err);
    });
    
  } catch (err) {
    res.status(400).send("Invalid token.");
    log.error(err);
  }
}
module.exports = {
  init: init,
  authorizeUser: authorizeUser,
};
