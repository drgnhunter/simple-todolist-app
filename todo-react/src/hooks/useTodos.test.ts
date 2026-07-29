import { renderHook, act } from "@testing-library/react";
import { useTodos, MAX_TASK_LENGTH } from "./useTodos";

describe("useTodos Hook", () => {
  it("should initialize with empty todos and no errors", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should add a new todo item", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Buy groceries");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Buy groceries");
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should toggle todo completion status", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Task to toggle");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  it("should update todo text when valid", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Initial text");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.updateTodoText(id, "Updated text");
    });

    expect(result.current.todos[0].text).toBe("Updated text");
  });

  it("should delete a todo item", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Task to delete");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(id);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it("should display an error when adding an empty task", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("   ");
    });

    expect(result.current.todos).toHaveLength(0);
    expect(result.current.error).toBe("Task description cannot be empty.");
  });

  it("should display an error when adding a task exceeding character limit", () => {
    const { result } = renderHook(() => useTodos());
    const longText = "a".repeat(MAX_TASK_LENGTH + 1);

    act(() => {
      result.current.addTodo(longText);
    });

    expect(result.current.todos).toHaveLength(0);
    expect(result.current.error).toBe(
      `Task cannot exceed ${MAX_TASK_LENGTH} characters (currently ${longText.length}).`
    );
  });

  it("should clear error message when clearError is called", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("");
    });

    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});