const RESPONSE_STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    ERROR: 500,
};

const CONSOLE = {
    info: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
};

const METHODS = {
    get: 'GET',
    put: 'PUT',
    post: 'POST',
    delete: 'DELETE',
    patch: 'PATCH',
};

const SLACK_FORMATTER = {
    SECTION: 'section',
    MARKDOWN: 'mrkdwn',
    DIVIDER: 'divider',
    PLAIN_TEXT: 'plain_text'
};

const COMMANDS = {
    ASK_ZIPY: '/askzipy',
    ASK_MEAN_ZIPY: '/askmeanzipy',
};

const STRING_CONSTANTS = {
    sarcastic: 'Sarcastic Mode Activated!',
    mean_prompt_prefix: 'Need Sarcastic Answers.\n',
};

module.exports = {
    RESPONSE_STATUS_CODE,
    CONSOLE,
    SLACK_FORMATTER,
    COMMANDS,
    STRING_CONSTANTS,
    METHODS
}