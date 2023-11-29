let tasks = [];
let completedTasks = [];

function changeTab(tabId) {
  document.querySelectorAll(".task-list").forEach((taskList) => {
    taskList.classList.remove("active");
  });

  document.querySelectorAll("nav li").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  document.getElementById(tabId + "Tab").classList.add("active");
}

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (title && description) {
    const task = { title, description };
    tasks.push(task);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    // Display the task in the Remaining Tasks section
    displayRemainingTasks();
    displayCompletedTasks();
  }
}

function displayTask(task, listId, isChecked) {
  const taskList = document.getElementById(listId);
  const taskItem = document.createElement("li");
  taskItem.classList.add("task");

  if (isChecked) {
    taskItem.innerHTML = `<input type="checkbox" checked onclick="uncompleteTask(this, ${
      completedTasks.length - 1
    })"><strong>${task.title}</strong>: ${task.description}`;
  } else {
    taskItem.innerHTML = `<input type="checkbox" onclick="completeTask(this, ${
      tasks.length - 1
    })"><strong>${task.title}</strong>: ${task.description}`;
  }

  taskList.appendChild(taskItem);
}

function completeTask(checkbox, index) {
  const task = tasks[index];
  if (checkbox.checked) {
    // Move the task to Completed Tasks
    tasks.splice(index, 1);
    completedTasks.push(task);
    displayTask(task, "completedTasksList", true);
    displayRemainingTasks();
  }
}

function uncompleteTask(checkbox, index) {
  const task = completedTasks[index];
  if (!checkbox.checked) {
    // Move the task back to Remaining Tasks
    completedTasks.splice(index, 1);
    tasks.push(task);
    displayTask(task, "remainingTasksList", false);
    displayCompletedTasks();
  }
}

function displayRemainingTasks() {
  const remainingTasksList = document.getElementById("remainingTasksList");
  remainingTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    displayTask(task, "remainingTasksList", false);
  });
}

function displayCompletedTasks() {
  const completedTasksList = document.getElementById("completedTasksList");
  completedTasksList.innerHTML = "";

  completedTasks.forEach((task, index) => {
    displayTask(task, "completedTasksList", true);
  });
}

function searchTasks(tabId) {
  const searchInputId = `${tabId}Search`;
  const searchTerm = document.getElementById(searchInputId).value.toLowerCase();
  const taskList = document.getElementById(tabId + "List");
  const allTasks =
    tabId === "remainingTasks" ? tasks : completedTasks.concat(tasks);

  const tasksToDisplay = allTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );

  taskList.innerHTML = "";
  tasksToDisplay.forEach((task, index) => {
    if (tabId === "remainingTasks") {
      displayTask(task, "remainingTasksList", false);
    } else {
      displayTask(task, "completedTasksList", true);
    }
  });
}
//html