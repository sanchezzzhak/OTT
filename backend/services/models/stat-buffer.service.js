const {Service} = require('moleculer');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

const config = require('../../../config/pg.config');

const STRING_LIMIT = 500;

class StatBufferService extends Service {
  constructor(broker) {
    super(broker);
    
    this.parseServiceSchema({
      name: 'stat-buffer.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: 'stat_buffer',
        define: {
          event_id: {
            type: Sequelize.INTEGER, allowNull: true, defaultValue: null,
          },
          status: {
            type: Sequelize.INTEGER, allowNull: true, defaultValue: null,
          },
          traffic_id: {
            type: Sequelize.UUID, allowNull: false,
          },
          domain: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          ip_type: {
            type: Sequelize.INTEGER,
          },
          ip: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
          },
          url: {
            type: Sequelize.STRING(STRING_LIMIT),
            allowNull: true,
            defaultValue: null,
          },
          referer: {
            type: Sequelize.STRING(STRING_LIMIT),
            allowNull: true,
            defaultValue: null,
          },
          user_agent: {
            type: Sequelize.STRING(STRING_LIMIT),
            allowNull: true,
            defaultValue: null,
          },
          // ======= android app id information
          app_name: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          // ======= bot information
          bot_name: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          bot_category: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          // ======= os information
          os_name: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          os_version: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          // ======= client information
          client_type: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          client_name: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          client_version: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          client_engine: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          client_engine_version: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          // ======= device information
          device_type: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          device_brand: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          device_model: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          device_code: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          // ======= other information
          data_json: {
            type: Sequelize.JSON, allowNull: true, defaultValue: null,
          },
          target: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          source1: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          source2: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          source3: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          source4: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          source5: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          created_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW,
          },
          updated_at: {
            type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true,
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
      actions: {
        // ====
        save: {
          params: {
            // event_id: {type: 'integer'},
            // traffic_id: {type: 'string'},
          },
          /**
           * Save buffer stat
           * @param {Context} ctx
           * @returns {Promise<{status: boolean}>}
           * @route stat-buffer.model.save
           */
          async handler(ctx) {
            let {name, value} = ctx.params;
            
            // todo save traffic to tmp table
            
          },
        },
        
      },
    });
    
  }
}

module.exports = StatBufferService;