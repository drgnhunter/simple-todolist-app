// test/todo.test.js
const assert = require("assert");
const { createTask, addTask } = require("../todo");

describe("To-Do List: Create Task", function () {

  describe("createTask()", function () {
    it("creates a task with correct default properties", function () {
      const task = createTask("Buy groceries");

      assert.strictEqual(task.title, "Buy groceries");
      assert.strictEqual(task.completed, false);
      assert.ok(typeof task.id === "number", "Task ID should be a timestamp/number");
    });

    it("trims extra whitespace from title", function () {
      const task = createTask("   Clean the room   ");
      assert.strictEqual(task.title, "Clean the room");
    });

    it("throws an error when title is empty or invalid", function () {
      assert.throws(function () {
        createTask("");
      }, /Task title cannot be empty/);

      assert.throws(function () {
        createTask("   ");
      }, /Task title cannot be empty/);
    });
  });

  describe("addTask()", function () {
    it("adds a new task to an empty list", function () {
      const initialList = [];
      const updatedList = addTask(initialList, "Walk the dog");

      assert.strictEqual(updatedList.length, 1);
      assert.strictEqual(updatedList[0].title, "Walk the dog");
    });

    it("appends task to an existing list without mutating the original", function () {
      const initialList = [{ id: 1, title: "Task 1", completed: false }];
      const updatedList = addTask(initialList, "Task 2");

      // Check new list updated
      assert.strictEqual(updatedList.length, 2);
      assert.strictEqual(updatedList[1].title, "Task 2");

      // Verify original list was NOT modified (Immutability check)
      assert.strictEqual(initialList.length, 1);
    });
  });

});