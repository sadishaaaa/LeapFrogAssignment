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
function renderList(tasks: TaskList, status: string) {
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

    const statusElement = document.createElement("div");
    statusElement.classList.add("task-status");
    statusElement.classList.add(task.completed ? "completed" : "assigned");
    statusElement.textContent = task.completed ? "Completed" : "Assigned";

    const assignedDate = document.createElement("div");
    assignedDate.classList.add("task-date");
    assignedDate.textContent = task.getAssignedDate()
      ? ` ${task.getAssignedDate()!.toLocaleString()}`
      : "";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeTask(task.id);
    });
    label.appendChild(taskValue);
    label.appendChild(assignedDate);
    label.appendChild(inputField);
    label.appendChild(statusElement);
    label.appendChild(removeButton);

    element.appendChild(label);

    taskListElement.appendChild(element);
  });
  const clearAllButton = document.createElement("button");
  clearAllButton.textContent = "Clear All";
  clearAllButton.style.background = "red";
  clearAllButton.style.color = "#fff";
  clearAllButton.style.borderRadius = "4px";
  clearAllButton.style.borderRadius = "4px";
  clearAllButton.style.border = "none";
  clearAllButton.style.padding = "0.6rem";

  clearAllButton.addEventListener("click", () => {
    clearAllTasks(status);
  });

  taskListElement.appendChild(clearAllButton);
 


  function showReminderWithDelay() {
    setTimeout(() => {
      if (hasRemainingTasks()) {
        showReminder();
      }
    }, 3000); 
  }

  showReminderWithDelay();
}
function clearAllTasks(status: string) {
  if (status === "completed") {
    taskList.list = taskList.list.filter((task) => !task.completed);
  } else if (status === "remaining") {
    taskList.list = taskList.list.filter((task) => task.completed);
  } else {
    taskList.list = [];
  }

  render();
}
function showReminder() {
  alert("This is reminder to complete your assigned task!");
}
function hasRemainingTasks(): boolean {
  return taskList.list.some((task) => !task.completed);
}

document.getElementById("remaining-tasks")?.addEventListener("click", () => {
  render("", "remaining");
});

document.getElementById("completed-tasks")?.addEventListener("click", () => {
  render("", "completed");
});
const tabs = document.querySelectorAll(".tab");

function tabClickHandler(this: HTMLElement) {
  // Remove the 'active' class from all tabs
  tabs.forEach((t: HTMLElement) => t.classList.remove("active"));

  // Add the 'active' class to the clicked tab
  this.classList.add("active");

  // Call the corresponding render function based on the clicked tab
  const tabId = this.id;
  switch (tabId) {
  case "remaining-tasks":
    render("", "remaining");
    break;
  case "completed-tasks":
    render("", "completed");
    break;
  case "all-tasks":
    render("", "");
    break;
  default:
    break;
  }
}

// Convert NodeList to array using Array.from
Array.from(tabs).forEach((tab: HTMLElement) => {
  tab.addEventListener("click", tabClickHandler);
});

tabs.forEach((tab: HTMLElement) => {
  tab.addEventListener("click", tabClickHandler);
});

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

function render(searchParam: string = "", status: string = "") {
  const filteredTaskList = search(taskList, searchParam);
  const filteredByStatus = status
    ? new TaskList(
      filteredTaskList.list.filter(
        (task) => task.completed === (status === "completed")))
    : filteredTaskList;

  renderList(filteredByStatus, status);

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

loadTasksFromLocalStorage();
