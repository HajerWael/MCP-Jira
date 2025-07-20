"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const User_1 = require("../models/User");
const definition = {
    name: 'search_for_user',
    description: 'List All Users match search keyword',
    parameters: {
        query: zod_1.z.string().describe('The search keyword ')
    }
};
const handler = async (args) => {
    var res = await User_1.User.get(args.query);
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
