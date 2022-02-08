const crypto = require('crypto');
const {Service} = require('moleculer');
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

const config = require('../../../config/pg.config');

class UserService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'user.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: 'users',
        define: {
          id: {
            type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true,
          },
          email: {
            type: Sequelize.STRING, unique: true, allowNull: false,
          },
          salt: Sequelize.STRING,
          password_hash: Sequelize.STRING,
          status: {
            type: Sequelize.SMALLINT, defaultValue: 0,
          },
          created_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW
          },
          updated_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true
          },
          last_seen_at: {
            type: Sequelize.DATE, allowNull: true
          }
        },
        options: {
          underscored: true,
          indexes: [{
            unique: false,
            fields: ['status']
          }, {
            unique: false,
            fields: ['created_at']
          }],
        }
      },
      settings: {
        fields: ['id', 'email', 'salt', 'password_hash', 'status']
      },
      actions: {

        /**
         * @param ctx
         * @returns {Promise<object>}
         */
        async login(ctx) {
          let {email, password} = ctx.params;

          const user = await this.model.findOne({where: {
            email: email.toLowerCase()
          }});

          let defaultError = 'login or password is not correct';

          if (!user) {
            return {err: defaultError}
          }

          if (!this.__validateHash(password, user.salt)) {
            return {err: defaultError}
          }

          console.log('user', user);


          return {id, email} = user;
        }
      }
    });
  }

  __validateHash(sourcePassword, salt) {
    return crypto.pbkdf2Sync(sourcePassword, salt, 1000, 64, `sha512`).toString(`hex`)
  }

  __createHash(sourcePassword) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = this.__validateHash(sourcePassword, salt);
    return {hash, salt}
  }
}


module.exports = UserService;