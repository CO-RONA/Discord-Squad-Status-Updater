const loggers = require('../utils/logger'),
    statusHandler = require('../utils/statusHandler'),
    util = require('../utils/util');

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run() {
        new statusHandler(this.client).run();
    }
}