const loggers = require('../utils/logger'),
    { REST } = require('@discordjs/rest'),
    { SlashCommandBuilder, Routes } = require('discord.js');

const register = async (client) => {
    if (!client.commands || client.commands.size === 0) return loggers.log('No commands found to register!', 'warn');
    const commands = [];
    for (const command of client.commands.values()) {
        try {
            const cmd = new SlashCommandBuilder()
                .setName(command.name)
                .setDescription(command.description);
            
            commands.push(cmd);

        } catch (error) {
            loggers.log(error, 'error');
        }
    }
    const rest = new REST({ version: '10' }).setToken(client.config.discord.token);
    rest.put(Routes.applicationGuildCommands(client.config.discord.clientID, client.config.discord.guildID), { body: commands })
        .then((data) => loggers.log(`Registered ${data.length} commands!`, 'synced'))
        .catch(console.error);
}

module.exports = { register };