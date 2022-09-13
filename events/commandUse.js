

const logger = require('../utils/logger');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        //console.log(interaction)
        const command = this.client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.run(this.client, interaction);
        } catch (error) {
            logger.log(error, 'error');
        }
    }
}