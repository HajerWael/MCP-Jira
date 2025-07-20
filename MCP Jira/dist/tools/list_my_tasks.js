"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const Issue_1 = require("../models/Issue");
const definition = {
    name: 'list_my_tasks',
    description: 'List All tasks that created by currrent user for a specific project',
    parameters: { projectKey: zod_1.z.string().describe('ProjectKey optional'), userEmail: zod_1.z.string().describe('Email') }
};
const handler = async (args) => {
    var res = await Issue_1.Issue.getTasksCreatedByUserInProject(args.userEmail, args.projectKey);
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
