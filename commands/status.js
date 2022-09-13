const loggers = require('../utils/logger'),
    { EmbedBuilder } = require('discord.js'),
    fs = require('fs'),
    fileHandler = require('../utils/fileHandler'),
    util = require('../utils/util');

module.exports = {
    name: 'status',
    description: 'Get the current status of the server',
    run: async (client, interaction) => {

        const userRoles = interaction.member.roles.cache.map(role => role.id);
        const allowedRoles = client.config.discord.whoCan;
        const allowed = userRoles.some(role => allowedRoles.includes(role));
        if (!allowed) {
            const embed = new EmbedBuilder()
                .setColor(0x00AE86)
                .setTitle('You do not have permission to use this command');
            return interaction.reply({ embeds: [embed] });
        }

        let players = client.server.players.length;
        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(client.server.name)
            .addFields(
                {name: 'Players', value: `\`\`\`${players} / ${client.server.maxplayers}\`\`\``, inline: false},
                {name: 'Current Map', value: `\`\`\`${client.server.map}\`\`\``, inline: true},
                {name: 'Next Map', value: `\`\`\`${client.server.nextLayer}\`\`\``, inline: true}
            )

        const message = await interaction.channel.send({ embeds: [embed] });
        
        const content = await fileHandler.readFromFile('./messageStore.json');
        content.data.push({message: message.id, channel: interaction.channel.id});
        await fileHandler.writeIntoFile('./messageStore.json', JSON.stringify(content));

    }
}