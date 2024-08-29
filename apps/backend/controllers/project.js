const { AbstractController } = require('node-moleculer-web');

class Project extends AbstractController {


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

module.exports = Project;