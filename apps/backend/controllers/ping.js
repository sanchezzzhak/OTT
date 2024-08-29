const { AbstractController } = require('node-moleculer-web');

class Ping extends AbstractController {

  async index() {
    return 'ok pong';
  }

}

module.exports = Ping;