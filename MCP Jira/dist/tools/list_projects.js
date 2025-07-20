"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const Project_1 = require("../models/Project");
const definition = {
    name: 'list_projects',
    description: 'List All Projects that user has accessaccessable for the current user',
    parameters: {}
};
const handler = async (args) => {
    var res = await Project_1.Project.List();
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
