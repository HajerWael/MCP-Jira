import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Issue } from '../models/Issue';

const definition = {
  name: 'list_issue_types',
  description: 'List All availabe types',
  parameters: { projectId: z.number().describe('ProjectId optional ')}
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await Issue.getTypes();
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