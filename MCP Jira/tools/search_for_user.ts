import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from 'zod';
import { User } from '../models/User';

const definition = {
  name: 'search_for_user',
  description: 'List All Users match search keyword',
  parameters: {     
      query: z.string().describe('The search keyword ')
  }
};
   
const handler = async (args: any): Promise<CallToolResult> => {

  var res = await User.get(args.query);
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