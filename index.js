const { Client, GatewayIntentBits, Partials } = require('discord.js'),
    fs = require('fs'),
    serverHandler = require('./utils/serverHandler'),
    socket = require('./utils/socketIO'),
    commands = require('./utils/commands'),
    loggers = require('./utils/logger');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
});
client.commands = new Map();

const readConfig = async () => {
    if (!fs.existsSync('./config.json')) return new Error('Config file not found!');
    const config = await fs.readFileSync('./config.json', 'utf8');
    client.config = JSON.parse(config);
    loggers.log('Config loaded!', 'ready');
}

const commandLoader = async () => {
    const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    if (commandFiles.length === 0) return loggers.log('No commands found!', 'warn');
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        loggers.log(`Loaded command ${command.name}`, 'ready');
    }
}

const readMessageStorage = async () => {
    if (!fs.existsSync('./messageStore.json')) return new Error('Message storage file not found!');
    const messageStorage = await fs.readFileSync('./messageStore.json', 'utf8');
    client.messageStorage = JSON.parse(messageStorage);
    loggers.log('Message storage loaded!', 'ready');
}

const eventLoader = async () => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = new (require(`./events/${file}`))(client);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => event.run(...args));
        loggers.log(`Loaded event ${eventName}`, 'ready');
    }
}

const initiliaze = async () => {
    await readConfig();
    await readMessageStorage();
    await eventLoader();
    await new socket(client).run();
    await new serverHandler(client).run();
    await client.login(client.config.discord.token);
    await commandLoader();
    await commands.register(client);
}

initiliaze();