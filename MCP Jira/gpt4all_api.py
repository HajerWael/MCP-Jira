from flask import Flask, request, jsonify, Response
from gpt4all import GPT4All
import uuid
import time
import subprocess
import os

app = Flask(__name__)
model = GPT4All(r"C:\Users\User\gpt4all\resources\mistral-7b-openorca.Q4_0.gguf", device='cpu')

def call_list_projects():
    project_root = os.path.dirname(os.path.abspath(__file__))
    mcp_jira_dir = project_root  # Adjust path if needed
    print(mcp_jira_dir)
    # Verify Node.js is available
    try:
        subprocess.run(["node", "--version"], check=True, capture_output=True)
    except subprocess.CalledProcessError:
        return "Error: Node.js is not installed or not in PATH"

    # Use absolute path to ts-node
    command = ["npx", "ts-node", "tools/list_projects.ts"]
    print("OKKK")
    
    try:
        result = subprocess.run(
            command,
            cwd=mcp_jira_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=10  # Increased timeout
        )
        
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")
        print(f"Return code: {result.returncode}")
        return result.stdout if result.returncode == 0 else f"Error: {result.stderr}"
    except Exception as e:
        return f"Exception: {str(e)}"

@app.route('/v1/chat/completions', methods=['POST'])
def chat():
    data = request.json
    user_message = data['messages'][0]['content']
    
    # Tool dispatching
    if "list projects" in user_message.lower():
        response = call_list_projects()
    elif "search user" in user_message.lower():  # Add more tools as needed
        response = call_search_user(user_message)
    else:
        response = model.generate(user_message, max_tokens=200)
    
    return jsonify({
        "choices": [{
            "message": {
                "role": "assistant",
                "content": response.strip()
            }
        }]
    })



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4891)