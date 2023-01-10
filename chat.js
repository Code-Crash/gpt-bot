const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const Logger = require('./logger');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * This method returns the slack friendly formatted response
 * @param {*} param0 
 * @returns 
 */
const getSlackBlock = ({ command, query, result, user_name }) => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<@${user_name}>:> *${query}*`,
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `:robot_face: \`${command}:>\`\n${result}`,
                }
            },
        ]
    };
};

/**
 * 
 * @param {Object} {prompt}
 * @returns 
 */
const ask = async ({ prompt, response_url, command, user_name, user_id }) => {
    Logger.info(' ask:', 'prompt:', prompt, ' response_url:', response_url, ' engine:', process.env.CHAT_GPT_ENGINE);
    try {
        let response = null;
        let query = prompt;
        Logger.info('command:', command, typeof command, command === '/askmeanzipy');
        if (command && command === '/askmeanzipy') {
            Logger.info(`Sarcastic Mode Activated!`);
            prompt = `Need Sarcastic Answers.\n${prompt}`;
        } else {
            prompt = `${prompt}`
        }
        if (prompt) {
            response = await openai.createCompletion({
                model: process.env.CHAT_GPT_ENGINE,
                prompt: `${prompt}`,
                temperature: 0.5,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                // echo: true,
                // stream: true,
                // stop: ["\n"],
            });
        }
        let result = '';
        if (response && response.data && response.data.choices && response.data.choices.length) {
            Logger.info('Got the response from ChatGPT!');
            Logger.info('response.data.choices:', response.data.choices, ' length:', choices.length);
            let choices = response.data.choices;
            for (let i = 0; i < choices.length; i++) {
                if (choices[i] && choices[i].text) {
                    result += choices[i].text;
                }
            }
            const data = getSlackBlock({ command, query, result, user_name });
            axios({
                method: 'POST',
                url: `${response_url}`,
                data: data,
            }).then((_response) => {
                // Logger.info('AXIOS:', _response.data);
            }).catch((error) => {
                Logger.error('AXIOS ERROR:', error);
            });
        }
        // resolve(result);
    } catch (error) {
        Logger.error('ask error: ', error.data, error.message, error.stack);
        // reject(error.message);
    }
}

const chat = {
    ask: ask
};

module.exports = chat;