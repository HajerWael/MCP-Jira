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
export class User {
    // User search function
    public static async get(query: string) {
        try {
            const response = await jiraClient.get('/rest/api/3/user/search', {
                params: { query }
                // headers: {
                //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
                // }
            });
            return response.data.map((record: { active: boolean; displayName: string; accountId: string; emailAddress:string }) => ({
                                accountId: record.accountId,    
                                active: record.active,    
                                displayName: record.displayName,    
                                emailAddress: record.emailAddress,    
                            }));
        } catch (error:any) {
            console.error('Error searching users:', error.response?.data || error.message);
            throw error;
        }
    }




}