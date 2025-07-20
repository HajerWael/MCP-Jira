import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import axios from 'axios';

const definition = {
    name: 'gpt4all',
    description: 'Query the local GPT4All LLM for natural language responses',
    parameters: {
        message: z.string().describe('The user message/prompt to send to GPT4All'),
        max_tokens: z.number().optional().default(200).describe('Maximum response length')
    }
};

const handler = async (args: {
    message: string;
    max_tokens?: number
}): Promise<CallToolResult> => {

    const response = await axios.post(
        'http://localhost:4891/v1/chat/completions',
        {
            messages: [{ role: "user", content: args.message }],
            max_tokens: args.max_tokens || 200
        },
        { timeout: 30000 }
    );

    return  {
        content: [{
            type: "text",
            text: `GPT4All response to: ${args.message}`
        }]
    };

};

export function register(server: McpServer) {
    server.tool(
        definition.name,
        definition.description,
        definition.parameters,
        handler
    );
}