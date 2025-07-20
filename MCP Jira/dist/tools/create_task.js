"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const Issue_1 = require("../models/Issue");
const definition = {
    name: 'create_task',
    description: 'Create a new task in a specific Jira project',
    parameters: {
        projectKey: zod_1.z.string().describe('Jira project key (e.g., EPIC)'),
        summary: zod_1.z.string().describe('Task title/summary'),
        description: zod_1.z.string().optional().describe('Task description'),
        creatorEmail: zod_1.z.string().optional().describe('Creator email (defaults to current user)')
    }
};
const handler = async (args) => {
    const res = await Issue_1.Issue.createTaskInProject(args.projectKey, args.summary, args.description || '', args.creatorEmail || '' // Falls back to authenticated user if not specified
    );
    return {
        content: [{
                type: 'text',
                text: `${JSON.stringify(res)}`
            }]
    };
};
function register(server) {
    server.tool(definition.name, definition.description, definition.parameters, handler);
}
