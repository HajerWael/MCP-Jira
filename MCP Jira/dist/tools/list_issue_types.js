"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const Issue_1 = require("../models/Issue");
const definition = {
    name: 'list_issue_types',
    description: 'List All availabe types',
    parameters: { projectId: zod_1.z.number().describe('ProjectId optional ') }
};
const handler = async (args) => {
    var res = await Issue_1.Issue.getTypes();
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
