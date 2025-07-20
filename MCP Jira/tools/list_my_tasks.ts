import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Issue } from '../models/Issue';

const definition = {
  name: 'list_my_tasks',
  description: 'List All tasks that created by currrent user for a specific project',
  parameters: { projectKey: z.string().describe('ProjectKey optional'),userEmail: z.string().describe('Email')}
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await Issue.getTasksCreatedByUserInProject(args.userEmail,args.projectKey);
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