const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * 
 * @param {Object} {prompt}
 * @returns 
 */
const ask = ({ prompt, response_url, command }) => {
    console.log(' ask:', 'prompt:', prompt, ' response_url:', response_url, ' engine:', process.env.CHAT_GPT_ENGINE);
    return new Promise(async (resolve, reject) => {
        try {
            let response = null;
            let prompt = '';
            console.log('command:', command, typeof command, command === '/askmeanzipy');
            if (req.body && req.body && req.body.command && req.body.command === '/askmeanzipy') {
                console.log(`Sarcastic Mode Selected!`);
                prompt = `Need Sarcastic Answers, ${req.body.text}`;
            } else {
                prompt = `${req.body.text}`
            }
            if (prompt) {

                // response = await openai.createCompletion({
                //     model: "text-davinci-003",
                //     prompt: "What time is it?",
                //     temperature: 0.5,
                //     max_tokens: 60,
                //     top_p: 0.3,
                //     frequency_penalty: 0.5,
                //     presence_penalty: 0.0,
                // });

                response = await openai.createCompletion({
                    model: process.env.CHAT_GPT_ENGINE,
                    // prompt: "What is ChatGPT?",
                    // prompt: "Write a code for addition?",
                    // prompt: "What time is it? with timezone IST?",
                    // prompt: "Q: What is human life expectancy in the United States?",
                    // prompt: "Which party did he belong to?",
                    prompt: `${prompt}`,
                    temperature: 0,
                    max_tokens: 100,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    // stop: ["\n"],

                    // temperature: 0.5,
                    // max_tokens: 60,
                    // top_p: 0.3,
                    // frequency_penalty: 0.5,
                    // presence_penalty: 0.0,
                    // stop: ["\n"],
                });
            }
            let result = null;
            if (response && response.data && response.data.choices && response.data.choices.length) {
                result = response.data.choices[0].text;
                console.log('ask result:', result, '\n\n\n');
                const res = await axios({
                    method: 'POST',
                    url: `${response_url}`,
                    data: { text: result }
                });
                console.log('axios res:', res && res.status);
            }
            // resolve(result);
        } catch (error) {
            console.log('ask error: ', error.data, error.message);
            // reject(error.message);
        }
    });
}

const chat = {
    ask: ask
};

module.exports = chat;