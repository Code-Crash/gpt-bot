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
const ask = ({ prompt, response_url }) => {
    console.log('ask:', 'prompt:', prompt, 'response_url:', response_url);
    return new Promise(async (resolve, reject) => {
        try {
            let response = null;
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
                    model: "text-davinci-003",
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
                axios({
                    method: 'POST',
                    url: `${response_url}`,
                    data: result
                });
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