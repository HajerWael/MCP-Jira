"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const Project_1 = require("../models/Project");
const definition = {
    name: 'get_project_info',
    description: 'Get Project info by specific id or key',
    parameters: { projectIdOrKey: zod_1.z.string().describe('project Id or key') }
};
const handler = async (args) => {
    var res = await Project_1.Project.get(args.projectIdOrKey);
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
