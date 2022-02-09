const crypto = require('crypto');
const {Service} = require('moleculer');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');
const JWT = require('../../utils/jwt');

const config = require('../../../config/pg.config');
const {jwt} = require('../../../config/app.config');

class UserService extends Service {

  static STATUS_ENABLE = 1;
  static STATUS_DISABLE = 0;
  static STATUS_BANNED = 3;

  constructor(broker) {
    super(broker);
    this.jwt = new JWT({key: jwt})

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
          },
          telegram_id: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null
          },
          pin_auth: {
            type: Sequelize.SMALLINT, defaultValue: 0,
          },
          pin_code: {
            type: Sequelize.SMALLINT(6), allowNull: true, defaultValue: null,
          },
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
         * auth get jwt token
         * @param {Context} ctx
         * @returns {Promise<{err: string}|{email: *, token: string}>}
         * @route user.model.login
         */
        async login(ctx) {
          const defaultError = 'login or password is not correct';
          let {email, password} = ctx.params;

          const user = await this.model.findOne({
            where: {
              email: email.toLowerCase()
            }
          });

          if (!user) {
            return {err: defaultError}
          }
          if (!this.validatePassword(password, user)) {
            return {err: defaultError}
          }
          if (user.status === UserService.STATUS_BANNED) {
            return {err: 'User banned'}
          }

          return {
            email: user.email,
            token: this.makeToken(user)
          };
        }
      }
    });
  }

  /**
   * Make token with payload
   * @param {{}} user - user model
   * @returns {string}
   */
  makeToken(user) {
    return this.jwt.create({
      id: user.id,
      email: user.email,
      status: user.status,
    })
  }

  /**
   * Compare open password with password hash
   * @param {string} sourcePassword
   * @param {{}} user - user model
   * @returns {boolean}
   */
  validatePassword(sourcePassword, user) {
    return this.makeHash(sourcePassword, user.salt) === user.password_hash;
  }

  /**
   * Make random new salt
   * @returns {string}
   */
  makeSalt() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Get password hash based on public password and salt
   * @param {string} sourcePassword
   * @param {string} salt
   * @returns {string}
   */
  makeHash(sourcePassword, salt) {
    return crypto.pbkdf2Sync(sourcePassword, salt, 1000, 64, `sha512`).toString(`hex`)
  }

  /**
   * Get password hash and new salt
   * @param {string} sourcePassword
   * @returns {{salt: string, hash: string}}
   */
  makeHashSalt(sourcePassword) {
    let salt = this.makeSalt();
    let hash = this.makeHash(sourcePassword, salt);
    return {hash, salt}
  }
}

module.exports = UserService;