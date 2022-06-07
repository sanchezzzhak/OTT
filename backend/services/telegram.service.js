const {Service} = require('moleculer');
const axios = require('axios');

const BASE_API_URL = 'https://api.telegram.org/'

const COMMAND_SEND_MESSAGE = 'sendMessage';
const COMMAND_ANSWER_CALLBACK = 'answerCallbackQuery';
const COMMAND_SEND_PHOTO = 'sendPhoto';
const COMMAND_SEND_AUDIO = 'sendAudio';
const COMMAND_GET_UPDATES = 'getUpdates';
const COMMAND_SET_WEBHOOK = 'setWebhook';
const COMMAND_GET_WEBHOOK_INFO = 'getWebhookInfo';

const appConfig = require('../../config/app.config');
const accessKey = appConfig.telegram;

class TelegramService extends Service
{
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'telegram',
      started: this.startedService,
      methods: {

        /**
         * send telegram message for chat id
         * @param ctx
         * @returns {Promise<void>}
         */
        async sendMessage(ctx) {
          let {chatId, text} = ctx.params;
          return await this.command(COMMAND_SEND_MESSAGE, {
            chat_id: chatId, text
          })
        },

        /**
         * send telegram photo for chat id
         * @param ctx
         * @returns {Promise<null|*>}
         */
        async sendPhoto(ctx) {
          let {chatId, photo, caption} = ctx.params;
          return await this.command(COMMAND_SEND_PHOTO, {
            chat_id: chatId, photo, caption: caption ?? ''
          });
        },

        /**
         * read all latest messages
         * @returns {Promise<null|*>}
         */
        async getUpdates() {
          return await this.command(COMMAND_GET_UPDATES)
        }

      }
    });
  }

  /**
   * send command for telegram api
   * @param {string} command
   * @param {{}} params
   * @returns {Promise<null|any>}
   */
  async command(command, params) {
    let searchParams = new URLSearchParams(params);
    let query = searchParams.toString();
    let url = `${BASE_API_URL}/${accessKey}/${command}?${query}`;
    try {
      let response = await axios({method: 'get', url});
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      this.logger.error('error execute command', command, e);
    }
    return null;
  }

  startedService(){

  }
}

module.exports = TelegramService;