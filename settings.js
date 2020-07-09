//create log object here and pass this settings to all the moduels from where:
//let log=setting.log;
const config = require("config");
const Logger = require("./log");

let log1 = new Logger(config);
let log = log1.getLogger();

module.exports = {
  log: log,
  config: config,
};
