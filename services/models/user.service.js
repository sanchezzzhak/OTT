const {Service} = require('moleculer');
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

const config = require('../../config/pg.config');

class UserService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'user.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: "user",
        define: {
          id: {
            type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true,
          },
          username: Sequelize.STRING,
          password_hash: Sequelize.STRING,
          status: {
            type: Sequelize.SMALLINT, defaultValue: 0
          },
          created_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW
          },
          last_seen_at: {
            type: Sequelize.DATE, allowNull: null
          }
        },
        options: {}
      },
    });
  }


}


module.exports = UserService;