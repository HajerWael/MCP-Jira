import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { Project } from '../models/Project';

const definition = {
  name: 'list_projects',
  description: 'List all projects accessible to the current user',
  parameters: {} // Add proper Zod schema if needed
};

// Main tool logic - reusable for both MCP and direct execution
export async function listProjects(): Promise<any[]> {
  return await Project.List();
}

// MCP handler wrapper
const handler = async (args: any): Promise<CallToolResult> => {
  try {
    const projects = await listProjects();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(projects)
      }]
    };
  } catch (error: any) {
    return error;
  }
};

// MCP registration
export function register(server: McpServer) {
  server.tool(definition.name, definition.description, definition.parameters, handler);
}
// console.log("Base URL:", process.env.JIRA_CONFIG_BASE_URL);
// Direct execution support
if (require.main === module) {
  (async () => {
    try {
      const projects = await listProjects();
      console.log(JSON.stringify(projects));
      process.exit(0);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
}


