const jwt = require("jsonwebtoken");


let storage;
let log;
let config;

function init(core) {
  
  storage = core.storage;
  log = core.log;
  config = core.config;
}

function authorizeUser(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
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

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

module.exports = {
  init: init,
  authorizeUser: authorizeUser,
  isLoggedIn: isLoggedIn
};
