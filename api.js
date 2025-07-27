const apikey = "3bad72f1-875b-4209-b068-0eecd0cde85a";
const apihost = "https://todo-api.coderslab.pl";


// co to jst ten authorization i jak dziala i content type tez 
const headers = {
  Authorization: apikey,
  "Content-Type": "application/json"
};

export function apiListTasks() {
  return fetch(`${apihost}/api/tasks`, { headers }).then(res => res.json());
}

export function apiCreateTask(title, description) {
  return fetch(`${apihost}/api/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title, description, status: "open" })
  }).then(res => res.json());
}

export function apiUpdateTask(taskId, title, description, status) {
  return fetch(`${apihost}/api/tasks/${taskId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ title, description, status })
  }).then(res => res.json());
}

export function apiDeleteTask(taskId) {
  return fetch(`${apihost}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers
  }).then(res => res.json());
}

export function apiListOperationsForTask(taskId) {
  return fetch(`${apihost}/api/tasks/${taskId}/operations`, {
    headers
  }).then(res => res.json());
}

export function apiCreateOperationForTask(taskId, description) {
  return fetch(`${apihost}/api/tasks/${taskId}/operations`, {
    method: "POST",
    headers,
    body: JSON.stringify({ description, timeSpent: 0 })
  }).then(res => res.json());
}

export function apiUpdateOperation(operationId, description, timeSpent) {
  return fetch(`${apihost}/api/operations/${operationId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ description, timeSpent })
  }).then(res => res.json());
}

export function apiDeleteOperation(operationId) {
  return fetch(`${apihost}/api/operations/${operationId}`, {
    method: "DELETE",
    headers
  }).then(res => res.json());
}
