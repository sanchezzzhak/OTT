const {Service} = require('moleculer');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

const config = require('../../../config/pg.config');

class ProjectService extends Service {
  constructor(broker) {
    super(broker);
    
    this.parseServiceSchema({
      name: 'project.model',
      mixins: [DbService],
      adapter: new SqlAdapter(config.dsn),
      model: {
        name: 'project',
        define: {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING, unique: false, allowNull: false,
          },
          token: {
            type: Sequelize.STRING, unique: true, allowNull: false,
          },
          description: {
            type: Sequelize.STRING, allowNull: true, defaultValue: null,
          },
          status: {
            type: Sequelize.INTEGER, allowNull: true, defaultValue: null,
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
              fields: ['token'],
            }, {
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
            // name: {type: 'string'},
            // token: {type: 'string'},
          },
          /**
           * Save project
           * @param {Context} ctx
           * @returns {Promise<{status: boolean}>}
           * @route project.model.save
           */
          async handler(ctx) {
            let {name, value} = ctx.params;
            
            // todo save project
            
          },
        },
        
      },
    });
    
  }
}

module.exports = ProjectService;