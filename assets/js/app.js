// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  // When starting the app:
  // - Load tasks from localStorage
  // - Update nextTaskId so it doesn't conflict
  // - Show tasks on the page
  // TODO: Load tasks and render them

  tasks = loadTasks();

  if (tasks.length > 0){
    const maxId = tasks.reduce(
      (max, task) => (task.id > max ? task.id : max),
      tasks[0].id    
    );
    nextTaskId = maxId + 1;
  }

  renderTasks(tasks, taskList, emptyState);

  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // What should happen here:
    // - Read values from the form (title, category, due date)
    
    const titleElement = document.getElementById("task-title");
    const categoryElement = document.getElementById("task-category");
    const dueDateElement = document.getElementById("task-due-date");

    const title = titleElement.value.trim();
    const category = categoryElement.value.trim();
    const dueDate = dueDateElement.value;

    // - Validate that the title is not empty

    if (!title) {
      return;
    }
    // - Create a new task object
    const newTask = {
      id: nextTaskId++,
      title: title,
      category: category || null,
      dueDate: dueDate || null,
      completed: false,
    };

    // - Add it to the tasks array
    tasks.push(newTask);

    // - Save updated tasks to localStorage
    saveTasks(tasks);

    // - Update the page to show the new task
    renderTasks(tasks, taskList, emptyState);

    // - Clear the form
    clearTaskForm(form);

    // TODO: Add a new task
  });



  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {
      // What should happen here:
      // - Find the matching task in the array
      // - Toggle its completed state
      // - Save updated tasks
      // - Update the page
      // TODO: Toggle completed state
        tasks = tasks.map((task) => 
          task.id === taskId ? {...task, completed: !task.completed }: task);
        saveTasks(tasks);
        renderTasks(tasks, taskList, emptyState);
        return;
      }
     

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-btn")) {
      // What should happen here:
      // - Remove the task from the tasks array
      // - Save updated tasks
      // - Update the page
      // TODO: Delete the task
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks(tasks);
        renderTasks(tasks, taskList, emptyState);
        return;
      }
   });
});
