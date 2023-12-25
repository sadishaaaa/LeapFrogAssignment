import "normalize.css";
import "./Styles/style.css";
import { Task } from "./Scripts/ts/Task";
import { TaskList } from "./Scripts/ts/TaskList";

const taskListElement = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const addTaskInput = document.getElementById("add-task-input");
const addTaskButton = document.getElementById("add-task-button");

const taskList = new TaskList();

function createTask(value: string): Task {
  const task = new Task(value);
  taskList.addTask(task);
  task.setAssignedDate(new Date());
  render();
  return task;
}

function toggleTaskCompleted(id: string): Task {
  const task = taskList.getTaskById(id);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  if (task) {
    task.toggleCompleted();
  }

  render();
  return task;
}

function search(list: TaskList, searchTerm: string = ""): TaskList {
  const tasks = list.list.filter((item) => {
    return item.value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return new TaskList(tasks);
}
function removeTask(id: string): void {
  taskList.removeTaskById(id);
  render();
}

function renderList(tasks: TaskList) {
  if (!taskListElement) throw new Error("DOM element not found");

  taskListElement.innerHTML = "";

  tasks.list.forEach((task) => {
    const element = document.createElement("div");
    element.classList.add("task-item");

    const label = document.createElement("label");
    label.classList.add("form-control");
    element.appendChild(label);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "checkbox");
    inputField.checked = task.completed;

    inputField.addEventListener("change", () => {
      toggleTaskCompleted(task.id);
    });

    const taskValue = document.createElement("div");
    taskValue.classList.add("task-item-value");
    taskValue.textContent = task.value;

    const status = document.createElement("div");
    status.classList.add("task-status");
    status.textContent = task.completed ? "Completed" : "Assigned";

    const assignedDate = document.createElement("div");
    assignedDate.classList.add("task-date");

    // Inside the renderList function
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeTask(task.id);
    });

    label.appendChild(removeButton);
    // Check if assignedDate is not null before calling toLocaleString
    assignedDate.textContent = task.getAssignedDate()
      ? ` ${task.getAssignedDate()!.toLocaleString()}`
      : "";

    label.appendChild(inputField);
    label.appendChild(taskValue);
    label.appendChild(status);
    label.appendChild(assignedDate);
    label.appendChild(removeButton);
    element.appendChild(label);

    taskListElement.appendChild(element);
  });
}

searchInput?.addEventListener("input", (e) => {
  const searchParam = (e.target as HTMLInputElement)?.value;

  render(searchParam);
});

addTaskButton?.addEventListener("click", () => {
  const newTaskValue = (addTaskInput as HTMLInputElement).value;
  if (newTaskValue.trim() !== "") {
    createTask(newTaskValue);
    (addTaskInput as HTMLInputElement).value = "";
  }
});

function render(searchParam: string = "") {
  const filteredTaskList = search(taskList, searchParam);

  renderList(filteredTaskList);
  localStorage.setItem("tasks", JSON.stringify(taskList.list));
}

function loadTasksFromLocalStorage(): void {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const parsedTasks = JSON.parse(storedTasks);
    taskList.list = parsedTasks.map(
      (task: any) => new Task(task.value, task.completed)
    );
    render();
  }
}

// Call this function on page load
loadTasksFromLocalStorage();
