const socketIO = require('socket.io-client'),
loggers = require('./logger');

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run() {

        this.client.socket = await socketIO.connect(
            "ws://" + this.client.config.socket.host + ":" + this.client.config.socket.port,
            {
                auth: {
                    token: this.client.config.socket.password
                }
            }
        );
        this.client.socket.on('connect', () => {
            loggers.log('Socket connected!', 'ready');
        });
        this.client.socket.onAny((event, ...args) => {
            this.client.emit(event, ...args);
        });
    }
}