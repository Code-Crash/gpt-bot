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
        const data = await chat.ask({ prompt: req.body.text || '' });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});