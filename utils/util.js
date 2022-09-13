const loggers = require('./logger'),
    gamedig = require('gamedig');

const manualQuery = async () => {
    try {
        return await gamedig.query({
            type: 'squad',
            host: this.client.config.server.host,
            port: this.client.config.server.queryPort
        });
    } catch (e) {
        loggers.log('Query failed!', 'error');
    }
}
module.exports = { manualQuery };