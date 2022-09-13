const chalk = require('chalk');

module.exports = class log {
    static log = (content, type = 'log') => {
        const timestamp = `[${chalk.gray(new Date().toLocaleString())}]`;
        switch (type) {
            case 'log': {
                return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${content} `);
            }
            case 'warn': {
                return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content} `);
            }
            case 'error': {
                return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content} `);
            }
            case 'debug': {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case "waiting": {
                return console.log(`${timestamp} ${chalk.magenta(type.toUpperCase())} ${content} `);
            }
            case "loaded": {
                return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content} `);
            }
            case "synced": {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case 'cmd': {
                return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            }
            case 'ready': {
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            }
            default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
        }
    }
}