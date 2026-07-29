import React, { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import type { Todo } from "../types/todo";
import { MAX_TASK_LENGTH } from "../hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onSaveEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onClearError?: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onSaveEdit,
  onDelete,
  onClearError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleStartEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
    if (onClearError) onClearError();
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSaveEdit(todo.id, editText);
    if (editText.trim() && editText.trim().length <= MAX_TASK_LENGTH) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
    if (onClearError) onClearError();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
      {isEditing ? (
        <form onSubmit={handleSave} className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={editText}
            maxLength={MAX_TASK_LENGTH}
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-2 py-1 bg-slate-600 hover:bg-slate-500 text-slate-200 text-xs font-semibold rounded-lg"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-3 overflow-hidden">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <span
              className={`truncate text-sm ${
                todo.completed ? "line-through text-slate-500" : "text-slate-200"
              }`}
            >
              {todo.text}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={handleStartEdit}
              className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-xs px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};