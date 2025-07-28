import { apiListTasks, apiCreateTask } from './api.js';
import { renderTask } from './task.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".js-task-adding-form");
  const titleInput = form.elements.title;
  const descriptionInput = form.elements.description;

  apiListTasks().then(res => {
    res.data.forEach(task => renderTask(task));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const prevError = form.querySelector(".task-error-msg");

    if (prevError) {
      prevError.remove();
    }

    if (title.length < 5 || description.length < 5) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "text-danger mt-2 task-error-msg";
      errorMsg.innerText = "Tytuł i opis nie mogą być krótsze niż 5 znaków";
      form.appendChild(errorMsg);
      return;
    }

    apiCreateTask(title, description).then(res => {
      renderTask(res.data);
      form.reset();
    });
  });
});