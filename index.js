require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chat = require('./chat');
const Logger = require('./logger');

// NOTE: Register Crash Handler
require('./crash-handler');

Logger.info(
    process.env.ENV,
    process.env.PORT,
    // process.env.OPENAI_API_KEY,
);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());

app.use('*', (req, _res, next) => {
    Logger.info(`------------------START [${Date.now()}]----------------------`);
    Logger.info(`Method: ${req.method} \nURL: ${req.url} \nParams: ${JSON.stringify(req.params || {})}  \nQuery: ${JSON.stringify(req.query || {})} \nHeaders: ${JSON.stringify(req.headers || {})} \nBody: ${JSON.stringify(req.body || {})}`);
    Logger.info(`------------------END [${Date.now()}]----------------------`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ dt: new Date(), data: req.body });
});

app.post('/chat', async (req, res) => {
    try {
        res.status(200).send(); // Response to Slack.
        await chat.ask({
            prompt: req.body.text || '',
            response_url: req.body.response_url,
            command: req.body.command,
            user_name: req.body.user_name,
            user_id: req.body.user_id
        });
    } catch (error) {
        res.status(500).send(error);
    }
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    Logger.info(`Welcome: Server is running on port ${PORT}`);
});