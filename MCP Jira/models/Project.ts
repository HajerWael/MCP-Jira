import axios from 'axios';
// Create Axios instance
const jiraClient = axios.create({
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
export class Project {
    // User search function
    public static async get() {
        try {
            const response = await jiraClient.get('/rest/api/3/project', {
                //params: { query }
                // headers: {
                //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
                // }
            });
            return response.data.map((record: { key: string; name: string; id: string; self:string }) => ({
                                id: record.id,    
                                name: record.name,    
                                self: record.self,    
                                key: record.key,    
                            }));
        } catch (error:any) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }
    
    public static async getTeam(projectKey:string) {
        try {
            ///rest/api/3/user/assignable/multiProjectSearch?projectKeys=PROJ
            const url =  `/rest/api/3/user/assignable/multiProjectSearch?projectKeys=${projectKey}`;
            const response = await jiraClient.get(url, {
            });
            return response.data;/*.map((record: { key: string; name: string; id: string; self: string }) => ({
                id: record.id,
                name: record.name,
                self: record.self,
                key: record.key,
            }));*/
        } catch (error: any) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }



}