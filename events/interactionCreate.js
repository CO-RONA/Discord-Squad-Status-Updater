const logger = require('../utils/logger');


module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        if (interaction.isCommand()) return this.client.emit('commandUse', interaction);
    }
}