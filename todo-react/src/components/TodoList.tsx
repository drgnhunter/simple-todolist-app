import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { todos, error, clearError, addTodo, toggleTodo, updateTodoText, deleteTodo } = useTodos();

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400">
        Task Manager
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} className="font-bold hover:text-rose-100 ml-2">
            ✕
          </button>
        </div>
      )}

      <TodoForm onAddTodo={addTodo} onClearError={clearError} />

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-slate-500 py-4 text-sm">
            No tasks yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onSaveEdit={updateTodoText}
              onDelete={deleteTodo}
              onClearError={clearError}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;