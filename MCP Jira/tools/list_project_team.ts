import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Project } from '../models/Project';

const definition = {
  name: 'list_project_team',
  description: 'List All Memebers for a specific project',
  parameters: { projectKey: z.string().describe('ProjectKey optional')}
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await Project.getTeam(args);
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