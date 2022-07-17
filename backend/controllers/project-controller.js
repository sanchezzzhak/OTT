const AbstractController = require("./abstract-controller");


class ProjectController extends AbstractController {


  /**
   * Список проектов
   */
  async index() {
    this.setCorsHeadersOver();
    this.setClientHintsHeaders();

    //





    return this.renderRaw({view: 'ok', statusCode: 200, format: 'txt'});
  }
}