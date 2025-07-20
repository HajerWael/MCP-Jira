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
export class Issue {
    public static async getTypes(projectId: string = '') {
        try {
            const url = projectId == '' ? '/rest/api/3/issuetype' : `/rest/api/3/issuetype/${projectId}`;
            const response = await jiraClient.get(url, {
                //params: { projectId }
                // headers: {
                //     'Cookie': 'atlassian.xsrf.token=e22b7c23d3524de03f420a256bf56492fc13cc0a_lin'
                // }
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


    public static async getTasksCreatedByUserInProject(
        userEmail: string,
        projectKey: string
    ): Promise<any[]> {
        try {
            // JQL query to find tasks created by specified user in project with type Task
            const jql = `creator = "${userEmail}" AND project = "${projectKey}" AND type = "Task"`;

            const response = await jiraClient.get('/rest/api/3/search', {
                params: {
                    jql,
                    maxResults: 100,  // Adjust based on your needs
                    fields: 'summary,status,assignee,created,creator',  // Include creator field
                    expand: 'renderedFields'
                }
            });

            return response.data.issues || [];
        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessages?.join(', ') ||
                error.response?.data?.message ||
                error.message;

            console.error(`Error fetching tasks in project ${projectKey} for user ${userEmail}:`, errorMessage);

            if (error.response?.status === 400) {
                throw new Error(`Invalid query parameters`);
            }

            if (error.response?.status === 404) {
                throw new Error(`Project ${projectKey} not found`);
            }

            throw new Error(`Failed to fetch tasks: ${errorMessage}`);
        }
    }

    public static async createTaskInProject(
        projectKey: string,
        summary: string,
        taskDescription: string,
        creatorEmail: string
    ): Promise<any> {
        try {
            const taskData = {
                fields: {
                    project: {
                        id: "1003"
                    },
                    summary: summary,
                    description: {
                        type: "doc",
                        version: 1,
                        content: [{
                            type: "paragraph",
                            content: [{
                                type: "text",
                                text: taskDescription
                            }]
                        }]
                    },
                    issuetype: {
                        name: "Task",
                        id:"10452"  // Make sure this matches your Jira's task type name
                    },
                    // If you need to set the creator explicitly (might require admin permissions)
                    creator: {
                        emailAddress: creatorEmail
                    }
                }
            };
// return JSON.stringify(taskData);
            const response = await jiraClient.post('/rest/api/3/issue', taskData, {
                
            }); 
            return response;
            // Optional: Fetch the full created task details
            const createdTask = await jiraClient.get(`/rest/api/3/issue/${response.data.key}`);
            return createdTask;

        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessages?.join(', ') ||
                error.response?.data?.message ||
                error.message;

            console.error(`Error creating task in project ${projectKey}:`, errorMessage);

            if (error.response?.status === 400) {
                throw new Error(`Invalid task data: ${errorMessage}`);
            }

            if (error.response?.status === 403) {
                throw new Error(`Permission denied to create tasks in ${projectKey}`);
            }

            throw new Error(`Failed to create task: ${errorMessage}`);
        }
    }


}