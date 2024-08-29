const {AbstractController} = require('node-moleculer-web');


class Setting extends AbstractController {

  /***
   * Update settings for route /settings
   *
   * @returns {Promise<void>}
   */
  async update() {

    // if (this.setCorsHeadersOver()) {
    //   return;
    // }
    //
    // let token = this.getHeader('authorization');
    // console.log({ token });
    //
    //
    // return this.renderRaw({ view: 'ok', statusCode: 200, format: 'txt' });
    //
    // // jwt token check
  }


}

module.exports = Setting;