import { apiUpdateOperation, apiDeleteOperation } from "./api.js";
import { formatTime } from "./utils.js";

export function renderOperation(ul, status, operation) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  ul.appendChild(li);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerText = operation.description;
  li.appendChild(descriptionDiv);

  const time = document.createElement("span");
  time.className = "badge badge-success badge-pill ml-2";
  time.innerText = formatTime(operation.timeSpent);
  descriptionDiv.appendChild(time);

  if (status === "open") {
    const controlDiv = document.createElement("div");
    controlDiv.className = "js-task-open-only";
    li.appendChild(controlDiv);

    const add15 = document.createElement("button");
    add15.className = "btn btn-outline-success btn-sm mr-2";
    add15.innerText = "+15m";
    controlDiv.appendChild(add15);

    add15.addEventListener("click", () => {
      const newTime = operation.timeSpent + 15;
      apiUpdateOperation(operation.id, operation.description, newTime).then(res => {
        time.innerText = formatTime(res.data.timeSpent);
        operation.timeSpent = res.data.timeSpent;
      });
    });

    const add60 = document.createElement("button");
    add60.className = "btn btn-outline-success btn-sm mr-2";
    add60.innerText = "+1h";
    controlDiv.appendChild(add60);

    add60.addEventListener("click", () => {
      const newTime = operation.timeSpent + 60;
      apiUpdateOperation(operation.id, operation.description, newTime).then(res => {
        time.innerText = formatTime(res.data.timeSpent);
        operation.timeSpent = res.data.timeSpent;
      });
    });

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-outline-danger btn-sm";
    delBtn.innerText = "Delete";
    controlDiv.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      apiDeleteOperation(operation.id).then(() => li.remove());
    });
  }
}
