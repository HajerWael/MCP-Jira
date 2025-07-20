import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Project } from '../models/Project';

const definition = {
  name: 'get_project_info',
  description: 'Get Project info by specific id or key',
  parameters: { projectIdOrKey:z.string().describe('project Id or key')}
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await Project.get(args.projectIdOrKey);
    return {
        content: [{
            type: 'text',
            text:`${JSON.stringify(res)}`
        }]
    };
};
  
export function register(server: McpServer) {

  server.tool(definition.name, definition.description, definition.parameters, handler);
}