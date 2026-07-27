// todo.js

/**
 * Pure function: Factory to create a single task object
 */
export function createTask(title) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Task title cannot be empty");
  }

  return {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };
}

/**
 * Pure function: Adds a newly created task to an existing array of tasks
 */
export function addTask(taskList, title) {
  const newTask = createTask(title);
  // Return a new array rather than mutating the original
  return [...taskList, newTask];
}

