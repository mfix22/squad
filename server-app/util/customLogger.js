function _debug(str){
  this.log(7, str);
}

function _error(str) {
  this.log(1, str);
}

function _info(str){
  this.log(3, str);
}

function _json(level, obj) {
  this.log(level, JSON.stringify(obj, null, 4));
}

function _log(level, str) {
  if (level <= this.level) {
    console.log(str);
  }
}

function Logger(level) {
  if (!level || level <= 0) throw new Error('Logger constructor requires a log level parameter.');
  if (typeof level == "number") this.level = level;
  else if (level == 'dev') this.level = 7;
  else if (level == 'prod') this.level = 1;
}

Logger.prototype.debug = _debug;
Logger.prototype.error = _error;
Logger.prototype.info = _info;
Logger.prototype.log = _log;
Logger.prototype.json = _json;

module.exports = Logger;
