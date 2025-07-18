import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { register as registerSeachForUsersTool } from "./tools/search_for_user";
import { register as registerListProjectsTool } from "./tools/list_projects";
import { register as registerListIssueTypes } from "./tools/list_issue_types";
import { register as registerListProjectTeam } from "./tools/list_project_team";
import dotenv from 'dotenv';
dotenv.config(); // Load .env file
// Configuration
const CONFIG = {
  server: {
    name: "JIRA-MCP-Server",
    version: "1.0.1"
  }
};
// 1.Create an MCP server
const server = new McpServer(CONFIG.server);

// 2.Start receiving messages on stdin and sending messages on stdout
const start = async () => {
  try {
    // Register tools if u have 
    // Start the server tools
    console.log("++ Register Tool SeachForUsers");
    registerSeachForUsersTool(server);
    console.log("++ Register Tool ListProjects");
    registerListProjectsTool(server);
    console.log("++ Register Tool GetIssueTypes");
    registerListIssueTypes(server);
    console.log("++ Register Tool registerListProjectTeam");
    registerListProjectTeam(server);
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("JIRA MCP Server started - ready for requests");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

