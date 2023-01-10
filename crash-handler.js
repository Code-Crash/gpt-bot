const Logger = require('./logger');

/**
 * Error Handling
 */
process.on('beforeExit', code => {
    // Can make asynchronous calls
    setTimeout(() => {
        Logger.error(`Process will exit with code: ${code}`);
        throw new Error(`Process will exit with code: ${code}`); // lint is throwing issue but we can also use process.exit(code);
    }, 100);
});

process.on('exit', code => {
    // Only synchronous calls
    Logger.error(`Process exited with code: ${code}`);
});

process.on('SIGTERM', signal => {
    Logger.error(
        `Process ${process.pid} received a SIGTERM signal, signal: ${signal}`
    );
    throw new Error(
        `Process ${process.pid} received a SIGTERM signal, signal: ${signal}`
    ); // lint is throwing issue but we can also use process.exit(0);
});

process.on('SIGINT', signal => {
    Logger.error(
        `Process ${process.pid} has been interrupted, signal: ${signal}`
    );
    throw new Error(
        `Process ${process.pid} has been interrupted, signal: ${signal}`
    ); // lint is throwing issue but we can also use process.exit(0);
});

process.on('uncaughtException', err => {
    Logger.error(
        `Uncaught Exception: ${err.message} \nFull Error: ${err}, Stack: ${err.stack}`
    );
    throw new Error(
        `Uncaught Exception: ${err.message} \nFull Error: ${err}, Stack: ${err.stack}`
    ); // lint is throwing issue but we can also use process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled rejection at ${promise}, reason: ${reason}`);
    throw new Error(`Unhandled rejection at ${promise}, reason: ${reason}`); // lint is throwing issue but we can also use process.exit(1);
});
