// register all env vars
require('dotenv').config({ path: __dirname + '/../.env' });
const { resolve } = require('node:path');
const {DBA} = require('node-dba');
// load all db config to global storage
DBA.loadConfigsForDir(resolve(__dirname + '/config/local/db'));

module.exports = {
  transporter: process.env.MOLECULAR_TRANSPORT ?? 'TCP',
  nodeID: 'OTT',
  registry: {
    strategy: process.env.REGISTRY_STRATEGY ?? 'RoundRobin',
    preferLocal: process.env.REGISTRY_PREFER_LOCAL ?? false
  },
  logger: console
};
