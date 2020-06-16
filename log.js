module.exports = class Log {
  envInfo = {};
  logFile = false;
  logPath = "";
  constructor(logFile, path, envInfo) {
    this.logFile = logFile;
    this.logPath = path;
    this.envInfo = envInfo;
  }
  getTime() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
  }
  info(data) {
    if (this.envInfo.info) {
      console.log("\x1b[36m", "info   : " + this.getTime() + " " + data);
    }
  }
  conf(data) {
    if (this.envInfo.conf) {
      console.log("\x1b[32m", "config : " + this.getTime() + " " + data);
      if (this.logFile) {
        //WRITE TO LOG
      }
    }
  }
  debug(data) {
    if (this.envInfo.debug) {
      console.log("\x1b[33m", "debug  : " + this.getTime() + " " + data);
      if (this.logFile) {
        //WRITE TO LOG
      }
    }
  }
  error(data) {
    if (this.envInfo.error) {
      console.log("\x1b[31m", "error  : " + this.getTime() + " " + data);
      if (this.logFile) {
        //WRITE TO LOG
      }
    }
  }
};
