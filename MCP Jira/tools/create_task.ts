import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Issue } from '../models/Issue';

const definition = {
    name: 'create_task',
    description: 'Create a new task in a specific Jira project',
    parameters: {
        projectKey: z.string().describe('Jira project key (e.g., EPIC)'),
        summary: z.string().describe('Task title/summary'),
        description: z.string().optional().describe('Task description'),
        creatorEmail: z.string().optional().describe('Creator email (defaults to current user)')
    }
};

const handler = async (args: any): Promise<CallToolResult> => {

    const res = await Issue.createTaskInProject(
        args.projectKey,
        args.summary,
        args.description || '',
        args.creatorEmail || '' // Falls back to authenticated user if not specified
    );

    return {
        content: [{
            type: 'text',
            text: `${JSON.stringify(res)}`
        }]
    };
};

export function register(server: McpServer) {

  server.tool(definition.name, definition.description, definition.parameters, handler);
}