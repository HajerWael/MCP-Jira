"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const axios_1 = __importDefault(require("axios"));
// Create Axios instance
const jiraClient = axios_1.default.create({
    baseURL: process.env.JIRA_CONFIG_BASE_URL,
    auth: {
        username: 'e-h.waeil@lean.sa' ?? '',
        password: process.env.JIRA_CONFIG_AUTH_ACCESS_TOKEN ?? ''
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
class Project {
    // User search function
    static async List() {
        try {
            const response = await jiraClient.get('/rest/api/3/project', {
            //params: { query }
            // headers: {
            //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
            // }
            });
            return response.data.map((record) => ({
                id: record.id,
                name: record.name,
                self: record.self,
                key: record.key,
            }));
        }
        catch (error) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }
    static async getTeam(projectKey) {
        try {
            ///rest/api/3/user/assignable/multiProjectSearch?projectKeys=PROJ
            const url = `/rest/api/3/user/assignable/multiProjectSearch?projectKeys=${projectKey}`;
            const response = await jiraClient.get(url, {});
            return response.data?.map((record) => ({
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
    static async get(projectIdOrKey) {
        try {
            try {
                const response = await jiraClient.get(`/rest/api/3/project/${projectIdOrKey}`, {
                //params: { query }
                // headers: {
                //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
                // }
                });
                return response.data;
            }
            catch (error) {
                console.error('Error searching users:', error.response?.data || error.message);
                throw error;
            }
        }
        catch (error) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }
}
exports.Project = Project;
