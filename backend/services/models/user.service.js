const crypto = require('crypto');
const {Service} = require('moleculer');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');
const JWT = require('../../utils/jwt');
const randomInt = require('../../utils/random-int');

const config = require('../../../config/pg.config');
const {jwt, secretRegisterKey} = require('../../../config/app.config');

console.log({secretRegisterKey})

class UserService extends Service {
  
  static STATUS_ENABLE = 1;
  static STATUS_DISABLE = 0;
  static STATUS_BANNED = 3;
  
  constructor(broker) {
    super(broker);
    this.jwt = new JWT({key: jwt});
    
    this.parseServiceSchema({
      name: 'user.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: 'users',
        define: {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
            type: Sequelize.DATE, defaultValue: Sequelize.NOW,
          },
          updated_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true,
          },
          last_seen_at: {
            type: Sequelize.DATE, allowNull: true,
          },
          telegram_id: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          pin_auth: {
            type: Sequelize.SMALLINT, defaultValue: 0,
          },
          pin_code: {
            type: Sequelize.STRING(10), allowNull: true, defaultValue: null,
          },
        },
        options: {
          underscored: true,
          indexes: [
            {
              unique: false,
              fields: ['status'],
            }, {
              unique: false,
              fields: ['created_at'],
            }],
        },
      },
      settings: {
        fields: ['id', 'email', 'salt', 'password_hash', 'status'],
      },
      actions: {
        // ====
        login: {
          params: {
            email: {type: 'email'},
            password: {type: 'string', min: 6},
            pin: {type: 'string', optional: true, min: 4, max: 10},
          },
          /**
           * auth and get jwt token
           * @param {Context} ctx
           * @returns {Promise<{err: string}|{email: *, token: string}>}
           * @route user.model.login
           */
          async handler(ctx) {
            const defaultError = 'Email or Password is not correct';
            let {email, password, pin} = ctx.params;
            
            const user = await this.model.findOne({
              where: {
                email: email.toLowerCase(),
              },
            });
            // check stage user
            if (!user) {
              return {err: defaultError};
            }
            if (!this.validatePassword(password, user)) {
              return {err: defaultError};
            }
            if (user.status === UserService.STATUS_BANNED) {
              return {err: 'User banned'};
            }
            // check pin code or send pin code to telegram
            if (user.pin_auth && user.telegram_id) {
              if (user.pin_code !== pin) {
                await this.sendPinCode(user);
                return {err: 'Wrong pin code'};
              } else {
                await this.updatePinCode(user, '');
              }
            }
            
            return {
              email: user.email,
              token: this.makeToken(user),
            };
          },
        },
        
        // ====
        register: {
          params: {
            email: {type: 'email'},
            password: {type: 'string', min: 6},
            passwordConfirm: {type: 'equal', field: 'password'},
            secretKey: {
              type: 'equal', value: secretRegisterKey,
              messages: { equalValue: 'Wrong secretKey'},
            },
          },
          
          /**
           * Register for site
           * @param {Context} ctx
           * @returns {Promise<{err: string}>}
           * @route user.model.register
           */
          async handler(ctx) {
            // check global config open register
            // send verify email
            let {email, password} = ctx.params;
            
            const user = await this.model.findOne({
              where: {
                email: email.toLowerCase(),
              },
            });
            if (user) {
              return {err: 'Email exists or invalid address'};
            }
            let securityData = this.makeHashSalt(password);
            // let inserted = await this.model.create({
            //   email,
            //   password_hash: securityData.hash,
            //   salt: securityData.salt,
            //   status: UserService.STATUS_ENABLE,
            // });
            return {
              status: true,
            };
          },
        },
        // ====
      },
    });
  }
  
  async updatePinCode(user, pin) {
    await this.model.updateById(user.id, {
      pin_code: pin,
    });
  }
  
  async sendPinCode(user) {
    const pin = randomInt(4, 6);
    await this.updatePinCode(user, pin);
    // send code to telegram
    /*
    await this.broker.call('telegram.send', {
      chatId: user.telegram_id,
      message: String(pin);
    });
    */
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
    });
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
    return crypto.pbkdf2Sync(
      sourcePassword,
      salt,
      1000,
      64,
      `sha512`,
    ).toString(`hex`);
  }
  
  /**
   * Get password hash and new salt
   * @param {string} sourcePassword
   * @returns {{salt: string, hash: string}}
   */
  makeHashSalt(sourcePassword) {
    let salt = this.makeSalt();
    let hash = this.makeHash(sourcePassword, salt);
    return {hash, salt};
  }
}

module.exports = UserService;