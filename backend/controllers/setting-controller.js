const AbstractController = require("./abstract-controller");


class SettingController extends AbstractController {

  /***
   * Update settings for route /settings
   *
   * @returns {Promise<void>}
   */
  async update() {

    if (this.setCorsHeadersOver()) {
      return;
    }

    let token = this.req.getHeader('authorization')
    console.log({token});





    return this.renderRaw({view: 'ok', statusCode: 200, format: 'txt'});

    // jwt token check
  }


}

module.exports = SettingController;