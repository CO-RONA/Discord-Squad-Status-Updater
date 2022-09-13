const loggers = require('./logger'),
    gamedig = require('gamedig');

module.exports = class {
    constructor(client) {
        this.client = client;
        this.nextLayer = null;
    }
    async run() {
        
        setInterval(async () => {
            if(this.client.server) {
                await this.client.socket.emit("rcon.getNextMap", "ShowNextMap" , (data) => {
                    this.nextLayer = data.layer;
                });
            }
            try {
                if(this.client.server && this.nextLayer) {
                    this.nextLayer = this.client.server.nextLayer;
                }
                this.client.server = await gamedig.query({
                    type: 'squad',
                    host: this.client.config.server.host,
                    port: this.client.config.server.queryPort
                })
                this.client.server.nextLayer = this.nextLayer;
            } catch (e) {
                loggers.log('Query failed!', 'error');
            }
        }, this.client.config.server.queryInterval);
    }
}