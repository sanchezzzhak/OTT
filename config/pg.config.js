const requireLocalConfig = require('../backend/utils/require-local-config')

/**
 * docs https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-sequelize#readme
 */
module.exports = {
  ...{
    dsn: 'postgres://root:mysql@localhost:5432/ott',
    options: {}
  },
  ...requireLocalConfig(__dirname + '/local/pg.config.js')
}