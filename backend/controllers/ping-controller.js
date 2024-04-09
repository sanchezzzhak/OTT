const { AbstractController } = require('node-moleculer-web');

class PingController extends AbstractController {

  async index() {
    return 'ok pong';
  }

}

module.exports = PingController;