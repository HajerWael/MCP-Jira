import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { Project } from '../models/Project';

const definition = {
  name: 'list_projects',
  description: 'List All Projects that user has accessaccessable for the current user',
  parameters: { }
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await Project.get();
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