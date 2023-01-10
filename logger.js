const { CONSOLE } = require('./constants');

const getPrefix = (type) => {
    return `[${new Date().toISOString()}] ${(type || '').toUpperCase()}`;
};

// TODO: We can integrate any third party logger here
class Logger {
    static config = {
        debug: true,
        info: true,
        warn: true,
        error: true,
    };

    static info(...args) {
        if (args && args.length && (Logger.config.debug || Logger.config.info)) {
            console.info(getPrefix(CONSOLE.info), ...args);
        }
    }

    static warn(...args) {
        if (args && args.length && (Logger.config.debug || Logger.config.warn)) {
            console.warn(getPrefix(CONSOLE.warn), ...args);
        }
    }

    static error(...args) {
        if (args && args.length && (Logger.config.debug || Logger.config.error)) {
            console.error(getPrefix(CONSOLE.error), ...args);
        }
    }
}


module.exports = Logger;