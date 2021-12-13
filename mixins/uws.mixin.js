
const UWS = require('uWebSockets.js');

const UwsServer = ({config: config} = {}) => ({
	server: null,
	name: 'web-server',
	actions: {},
	routes: [],
	settings: {
		port: config.port ?? 3001,
		ssl: config.ssl ?? {},
		ip: config.ip ?? '127.0.0.1',
	},

	created() {
		this.createServer()
	},

	started() {
		this.listenServer();
	},

	stopped() {},

	methods: {
		listenServer(){
			this.server.any('/*', async (res, req) => {
				// adds middleware
				req.setYield(true);
			});
			this.server.listen(this.settings.port, (listenSocket) => {
				if (listenSocket) {
					this.logger.info(`Server listening port:${this.settings.port}`);
				}
			})
		},

		createServer() {
			if (this.settings.ssl.enable) {
				this.server = UWS.SSLApp({
					key_file_name: this.settings.ssl.keyPath,
					cert_file_name: this.settings.ssl.certPath
				})
				return;
			}
			this.server = UWS.App({});
		}
	}
});

module.exports = UwsServer;