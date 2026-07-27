import { createTask, addTask } from "./todo.js";

// --- Application State ---
let state = {
  todoList: []
};

// Helper function to fetch HTML files
async function loadTemplate(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`Failed to load ${filePath}`);
  return await response.text();
}

// --- Views ---
async function renderHome() {
  return await loadTemplate("/views/home.html");
}

async function renderTodos() {
  const template = await loadTemplate("/views/todos.html");
  
  // Inject dynamic task list state into template
  const itemsHtml = state.todoList
    .map((task) => `<li>${task.title}</li>`)
    .join("");

  return template.replace(
    '<!-- Dynamic JS list items will go here -->', 
    itemsHtml || '<li>No tasks found. Create one!</li>'
  );
}

// View for creating tasks directly with form & list on screen
async function renderTodoList() {
  const itemsHtml = state.todoList
    .map((task) => `<li>${task.title}</li>`)
    .join("");

  return `
    <h1>My To-Do Application</h1>

    <!-- Task Creation Form -->
    <form id="create-task-form">
      <input type="text" id="task-title-input" placeholder="Enter task title..." required />
      <button type="submit">Add Task</button>
    </form>

    <hr />

    <!-- Task List -->
    <h2>Task List</h2>
    <ul>
      ${itemsHtml || "<li>No tasks yet! Add one above.</li>"}
    </ul>
    <br/>
    <a href="/" data-link>Back to Home</a>
  `;
}

async function renderNotFound() {
  return await loadTemplate("/views/404.html");
}

// --- Step 4: Create a Route Table ---
const routes = {
  "/": renderHome,
  "/todos": renderTodos,
  "/task/create": renderTodoList,
};

// --- Step 5: Implement the Main Router Function ---
async function router() {
  const path = window.location.pathname;
  const viewFunction = routes[path] || renderNotFound;

  const appContainer = document.getElementById("app");
  if (appContainer) {
    // FIX: Must 'await' the view function execution before setting innerHTML
    appContainer.innerHTML = await viewFunction();
  }
}

// --- Step 6: Create the Navigation Function ---
function navigateTo(url) {
  window.history.pushState(null, null, url);
  router();
}

// --- Step 7: Handle Browser History Events ---
window.addEventListener("popstate", router);

// --- Initialization Block ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Step 8: Intercept Link Clicks (Event Delegation) ---
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // --- Step 9: Handle Form Submissions & State Updates ---
  document.body.addEventListener("submit", (e) => {
    if (e.target.id === "create-task-form") {
      e.preventDefault();

      const titleInput = document.getElementById("task-title-input");
      const titleValue = titleInput.value;

      // Update state immutably using imported helper
      state.todoList = addTask(state.todoList, titleValue);

      // Re-render current page or redirect to /todos
      router(); 
    }
  });

  // --- Step 10: Trigger Initial Load ---
  router();
});