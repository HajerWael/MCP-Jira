"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const axios_1 = __importDefault(require("axios"));
// Create Axios instance
const jiraClient = axios_1.default.create({
    baseURL: process.env.JIRA_CONFIG_BASE_URL,
    auth: {
        username: process.env.JIRA_CONFIG_AUTH_USERNAME ?? '',
        password: process.env.JIRA_CONFIG_AUTH_ACCESS_TOKEN ?? ''
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
class User {
    // User search function
    static async get(query) {
        try {
            const response = await jiraClient.get('/rest/api/3/user/search', {
                params: { query }
                // headers: {
                //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
                // }
            });
            return response.data.map((record) => ({
                accountId: record.accountId,
                active: record.active,
                displayName: record.displayName,
                emailAddress: record.emailAddress,
            }));
        }
        catch (error) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }
}
exports.User = User;
