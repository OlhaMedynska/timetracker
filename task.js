import { apiDeleteTask, apiListOperationsForTask, apiUpdateTask, apiCreateOperationForTask } from './api.js';
import { renderOperation } from './operation.js';

export function renderTask(task) {
  const section = document.createElement("section");
  section.className = "card mt-5 shadow-sm";
  document.querySelector("main").appendChild(section);

  const headerDiv = document.createElement("div");
  headerDiv.className = "card-header d-flex justify-content-between align-items-center";
  section.appendChild(headerDiv);

  const headerLeftDiv = document.createElement("div");
  headerDiv.appendChild(headerLeftDiv);

  const h5 = document.createElement("h5");
  h5.innerText = task.title;
  headerLeftDiv.appendChild(h5);

  const h6 = document.createElement("h6");
  h6.className = "card-subtitle text-muted";
  h6.innerText = task.description;
  headerLeftDiv.appendChild(h6);

  const headerRightDiv = document.createElement("div");
  headerDiv.appendChild(headerRightDiv);

  if (task.status === "open") {
    const finishButton = document.createElement("button");
    finishButton.className = "btn btn-dark btn-sm js-task-open-only";
    finishButton.innerText = "Finish";
    headerRightDiv.appendChild(finishButton);

    finishButton.addEventListener("click", () => {
      apiUpdateTask(task.id, task.title, task.description, "closed").then(() => {
        section.querySelectorAll(".js-task-open-only").forEach(el => el.remove());
      });
    });
  }

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-outline-danger btn-sm ml-2";
  deleteButton.innerText = "Delete";
  headerRightDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    apiDeleteTask(task.id).then(() => section.remove());
  });

  const ul = document.createElement("ul");
  ul.className = "list-group list-group-flush";
  section.appendChild(ul);

  apiListOperationsForTask(task.id).then(response => {
    response.data.forEach(operation => {
      renderOperation(ul, task.status, operation);
    });
  });

  if (task.status === "open") {
    const addOperationDiv = document.createElement("div");
    addOperationDiv.className = "card-body js-task-open-only";
    section.appendChild(addOperationDiv);

    const form = document.createElement("form");
    addOperationDiv.appendChild(form);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    form.appendChild(inputGroup);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Operation description";
    input.minLength = 5;
    input.className = "form-control";
    inputGroup.appendChild(input);

    const append = document.createElement("div");
    append.className = "input-group-append";
    inputGroup.appendChild(append);

    const addButton = document.createElement("button");
    addButton.className = "btn btn-info";
    addButton.innerText = "Add";
    append.appendChild(addButton);

    form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = input.value.trim();

  if (description.length < 5) {
    if (!form.querySelector(".error-msg")) {
      const msg = document.createElement("div");
      msg.className = "text-danger mt-2 error-msg";
      msg.innerText = "Opis operacji musi mieć co najmniej 5 znaków.";
      form.appendChild(msg);
    }
    return;
  }

  const prevMsg = form.querySelector(".error-msg");
  if (prevMsg) {
    prevMsg.remove();
  }

  apiCreateOperationForTask(task.id, description).then(res => {
    renderOperation(ul, task.status, res.data);
    form.reset();
  });
});

  }
}
