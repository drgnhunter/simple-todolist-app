import { useState } from "react";
import type { Todo } from "../types/todo";

export const MAX_TASK_LENGTH = 100;

const generateId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useTodos = (initialTodos: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const addTodo = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Task description cannot be empty.");
      return;
    }

    if (trimmed.length > MAX_TASK_LENGTH) {
      setError(`Task cannot exceed ${MAX_TASK_LENGTH} characters (currently ${trimmed.length}).`);
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setError(null);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodoText = (id: string, newText: string) => {
    const trimmed = newText.trim();

    if (!trimmed) {
      setError("Updated task cannot be blank.");
      return;
    }

    if (trimmed.length > MAX_TASK_LENGTH) {
      setError(`Task cannot exceed ${MAX_TASK_LENGTH} characters (currently ${trimmed.length}).`);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
    setError(null);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    error,
    clearError,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
  };
};