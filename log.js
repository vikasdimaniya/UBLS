const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
let CustomLevels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  conf: 6,
  info: 7,
  debug: 8,
};
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

class Logger {
  constructor(config) {
    console.log(config.get("seprateErrorLog"));
    console.log(config.get("log-file-path"));
    let transportArray = [];
    if (config.get("seprateErrorLog")) {
      transportArray = [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `emerg` and below to `combined.log`
        //
        new transports.File({
          filename: config.get("log-file-path") + "error.log",
          level: "error",
        }),
        new transports.File({
          filename: config.get("log-file-path") + "combined.log",
        }),
      ];
    } else {
      transportArray = [
        // - Write all logs with level `emerg` and below to `combined.log`
        new transports.File({
          filename: config.get("log-file-path") + "combined.log",
        }),
      ];
    }

    this.logger = createLogger({
      levels: CustomLevels,
      format: combine(timestamp(), myFormat),
      //format: format.json(),
      defaultMeta: { service: config.get("name") + "-service" },
      transports: transportArray,
    });

    if (config.get("log-on-console")) {
      this.logger.add(
        new transports.Console({
          format: myFormat,
        })
      );
    }
  }
  getLogger() {
    return this.logger;
  }
}
module.exports = Logger;
// module.exports = class Log {
//   envInfo = {};
//   logFile = false;
//   logPath = "";
//   constructor(logFile, path, envInfo) {
//     this.logFile = logFile;
//     this.logPath = path;
//     this.envInfo = envInfo;
//   }
//   getTime() {
//     let ts = Date.now();
//     let date_ob = new Date(ts);
//     let date = date_ob.getDate();
//     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//     let year = date_ob.getFullYear();
//     return year + "-" + month + "-" + date;
//   }
//   info(data) {
//     if (this.envInfo.info) {
//       console.log("\x1b[36m", "info   : " + this.getTime() + " " + data);
//     }
//   }
//   conf(data) {
//     if (this.envInfo.conf) {
//       console.log("\x1b[32m", "config : " + this.getTime() + " " + data);
//       if (this.logFile) {
//         //WRITE TO LOG
//       }
//     }
//   }
//   debug(data) {
//     if (this.envInfo.debug) {
//       console.log("\x1b[33m", "debug  : " + this.getTime() + " " + data);
//       if (this.logFile) {
//         //WRITE TO LOG
//       }
//     }
//   }
//   error(data) {
//     if (this.envInfo.error) {
//       console.log("\x1b[31m", "error  : " + this.getTime() + " " + data);
//       if (this.logFile) {
//         //WRITE TO LOG
//       }
//     }
//   }
// };
