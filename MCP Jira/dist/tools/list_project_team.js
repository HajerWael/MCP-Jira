"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const Project_1 = require("../models/Project");
const definition = {
    name: 'list_project_team',
    description: 'List All Memebers for a specific project',
    parameters: { projectKey: zod_1.z.string().describe('ProjectKey optional') }
};
const handler = async (args) => {
    var res = await Project_1.Project.getTeam(args.projectKey);
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
