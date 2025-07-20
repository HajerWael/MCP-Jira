import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { register as registerSeachForUsersTool } from "./tools/search_for_user";
import { register as registerListProjectsTool } from "./tools/list_projects";
import { register as registerListIssueTypes } from "./tools/list_issue_types";
import { register as registerListProjectTeam } from "./tools/list_project_team";
import { register as registerGetProjectInfo} from "./tools/get_project_info";
import { register as registerListMyTasks} from "./tools/list_my_tasks";
import { register as registerCreateTask} from "./tools/create_task";
import { register as registerGpt4allQuery } from './tools/gpt4all';
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
// Add stdin handler for direct JSON input
const setupStdinListener = () => {
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (data:string) => {
    try {
      const input = JSON.parse(data);
      if (input.tool === "list_projects") {
        // Call your tool directly (bypass MCP)
        const result = require("./tools/list_projects").listProjects();
        process.stdout.write(JSON.stringify({ result }) + "\n");
      }
    } catch (err:any) {
      process.stderr.write(`Error: ${err.message}\n`);
    }
  });
};

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
    console.log("++ Register Tool registerGetProjectInfo");
    registerGetProjectInfo(server);
    console.log("++ Register Tool registerListMyTasks");
    registerListMyTasks(server);
    console.log("++ Register Tool registerCreateTask");
    registerCreateTask(server);
    console.log("++ Register Tool registerGpt4allQuery");
    registerGpt4allQuery(server);
    const transport = new StdioServerTransport();
    ///// 
    
    ////
    await server.connect(transport);//Ensure your server is running with stdio transport
    console.log("JIRA MCP Server started - ready for requests");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

