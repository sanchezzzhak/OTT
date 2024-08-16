const { AbstractController } = require('node-moleculer-web');

class ProjectController extends AbstractController {


  /**
   * Список проектов
   */
  async index() {
    this.setCorsHeadersOver();
    this.setClientHintsHeaders();

    //


    return this.renderRaw({ view: 'ok', statusCode: 200, format: 'txt' });
  }
}

module.exports = ProjectController;