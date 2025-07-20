"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const axios_1 = __importDefault(require("axios"));
const definition = {
    name: 'gpt4all',
    description: 'Query the local GPT4All LLM for natural language responses',
    parameters: {
        message: zod_1.z.string().describe('The user message/prompt to send to GPT4All'),
        max_tokens: zod_1.z.number().optional().default(200).describe('Maximum response length')
    }
};
const handler = async (args) => {
    const response = await axios_1.default.post('http://localhost:4891/v1/chat/completions', {
        messages: [{ role: "user", content: args.message }],
        max_tokens: args.max_tokens || 200
    }, { timeout: 30000 });
    return {
        content: [{
                type: 'text',
                text: response.data.choices[0].message.content
            }]
    };
};
function register(server) {
    server.tool(definition.name, definition.description, definition.parameters, handler);
}
