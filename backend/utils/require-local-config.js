const fs = require('fs');
const requireLocalConfig = (path, defaultConfig = {}) => {
  return fs.existsSync(path) ? require(path) : defaultConfig;
}

module.exports = requireLocalConfig;