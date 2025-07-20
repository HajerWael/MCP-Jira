"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const search_for_user_1 = require("./tools/search_for_user");
const list_projects_1 = require("./tools/list_projects");
const list_issue_types_1 = require("./tools/list_issue_types");
const list_project_team_1 = require("./tools/list_project_team");
const get_project_info_1 = require("./tools/get_project_info");
const list_my_tasks_1 = require("./tools/list_my_tasks");
const create_task_1 = require("./tools/create_task");
const gpt4all_1 = require("./tools/gpt4all");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load .env file
// Configuration
const CONFIG = {
    server: {
        name: "JIRA-MCP-Server",
        version: "1.0.1"
    }
};
// 1.Create an MCP server
const server = new mcp_js_1.McpServer(CONFIG.server);
// 2.Start receiving messages on stdin and sending messages on stdout
const start = async () => {
    try {
        // Register tools if u have 
        // Start the server tools
        console.log("++ Register Tool SeachForUsers");
        (0, search_for_user_1.register)(server);
        console.log("++ Register Tool ListProjects");
        (0, list_projects_1.register)(server);
        console.log("++ Register Tool GetIssueTypes");
        (0, list_issue_types_1.register)(server);
        console.log("++ Register Tool registerListProjectTeam");
        (0, list_project_team_1.register)(server);
        console.log("++ Register Tool registerGetProjectInfo");
        (0, get_project_info_1.register)(server);
        console.log("++ Register Tool registerListMyTasks");
        (0, list_my_tasks_1.register)(server);
        console.log("++ Register Tool registerCreateTask");
        (0, create_task_1.register)(server);
        console.log("++ Register Tool registerGpt4allQuery");
        (0, gpt4all_1.register)(server);
        const transport = new stdio_js_1.StdioServerTransport();
        ///// 
        ////
        await server.connect(transport); //Ensure your server is running with stdio transport
        console.log("JIRA MCP Server started - ready for requests");
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
start();
