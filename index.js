require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chat = require('./chat');

console.log('ENV:', process.env.PORT, process.env.OPENAI_API_KEY);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use('*', (req, res, next) => {
    console.log(`------------------START [${Date.now()}]----------------------`);
    console.log(`Method: ${req.method} \nURL: ${req.url} \nParams: ${JSON.stringify(req.params || {})}  \nQuery: ${JSON.stringify(req.query || {})} \nHeaders: ${JSON.stringify(req.headers || {})} \nBody: ${JSON.stringify(req.body || {})}`);
    console.log(`------------------END [${Date.now()}]----------------------`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ dt: new Date() });
});

app.post('/chat', async (req, res) => {
    try {
        // await chat
        res.status(200).send();
        await chat.ask({ prompt: req.body.text || '', response_url: req.body.response_url });
        // res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/chat', async (req, res) => {
    try {
        let prompt = '';
        let command = req.body && req.body.command ? req.body.command : '';
        console.log('command:', command, typeof command, command === '/askmeanzipy');
        if (req.body && req.body && req.body.command && req.body.command === '/askmeanzipy') {
            console.log(`Sarcastic Mode Selected!`);
            prompt = `Need Sarcastic Answers, ${req.body.text}`;
        } else {
            prompt = `${req.body.text}`
        }
        res.status(200).send();
        await chat.ask({ prompt, response_url: req.body.response_url });
        // res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});