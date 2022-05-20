const {Service} = require('moleculer');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

const config = require('../../../config/pg.config');

class SettingService extends Service {
  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: 'setting.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: 'settings',
        define: {
          name: {
            type: Sequelize.STRING, unique: true, allowNull: false,
          },
          value: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          }
        }
      },
      settings: {
        fields: ['name', 'value'],
      },
      actions: {
        // ====
        save: {
          params: {
            name: {type: 'string'},
            value: {type: 'string'},
          },
          /**
           * create or update value for global setting
           * @param {Context} ctx
           * @returns {Promise<{status: boolean}>}
           * @route user.model.save
           */
          async handler(ctx) {
            let {name, value} = ctx.params;

            try {
              let setting = await this.model.findOne({
                where: {
                  name: name.toLowerCase(),
                },
                limit: 1
              })
              if (!setting) {
                setting = await this.model.create({
                  name, value
                });
              } else {
                await setting.update({value});
              }
              return {
                status: true,
              };
            } catch (err) {
              this.logger.error(err);
            }
            return {
              status: false,
            };
          }
        },
        // ====

        find: {
          params: {
            name: {type: 'string'},
          },
          /**
           * find get value for global setting
           * @param {Context} ctx
           * @returns {Promise<{value: null}|{value: *}>}
           * @route setting.model.find
           */
          async handler(ctx) {
            let {name} = ctx.params;
            const setting = await this.model.findOne({
              where: {
                name: name.toLowerCase(),
              },
              limit: 1
            })
            if (!setting) {
              return {value: null};
            }

            return {value: setting.value};
          }
        }

      }
    });


  }
}

module.exports = SettingService;