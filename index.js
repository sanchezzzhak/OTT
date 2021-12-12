
// const pathRegexp = require('path-to-regexp');

import CONFIG from './config.js';
import UWS  from 'uWebSockets.js'

let server;

if (CONFIG.ssl.enable) {
    server = UWS.SSLApp({
        key_file_name: CONFIG.ssl.keyPath,
        cert_file_name: CONFIG.ssl.certPath
    })
} else {
    server = UWS.App({});
}
server.any('/*', async (res, req) => {

    // adds middleware


    req.setYield(true);
});

server.listen(CONFIG.port, (listenSocket) => {
    if (listenSocket) {
        console.log('Server listening to port %s', CONFIG.port);
    }
});
