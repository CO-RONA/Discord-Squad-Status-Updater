const { EmbedBuilder } = require('discord.js');

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run() {
        setInterval(async () => {
            if (this.client.server) {
                const players = this.client.server.players.length;
                const status = players > 100 ? players.length + `(${players - 100})` : players + '/' + this.client.server.maxplayers + ' | ' + this.client.server.map;
                this.client.user.setActivity(status, { type: 2 });
                if (this.client.messageStorage.data.length > 0) {
                    this.client.messageStorage.data.forEach(async (message) => {
                        const channel = this.client.channels.cache.get(message.channel);
                        const msg = await channel.messages.fetch(message.message);
                        if (!msg) return;
                        const embed = new EmbedBuilder()
                            .setColor(0x00AE86)
                            .setTitle(this.client.server.name)
                            .addFields(
                                {
                                    name: 'Players',
                                    value: `\`\`\`${players} / ${this.client.server.maxplayers}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: 'Current Map',
                                    value: `\`\`\`${this.client.server.map}\`\`\``,
                                    inline: true
                                },
                                {
                                    name: 'Next Map',
                                    value: `\`\`\`${this.client.server.nextLayer}\`\`\``,
                                    inline: true
                                }
                            )
                            .setImage(`https://squad-data.nyc3.cdn.digitaloceanspaces.com/main/${this.client.server.map}.jpg`);
                            
                        msg.edit({ embeds: [embed] });
                    });
                }
            }
        }, 2000);
    }
}