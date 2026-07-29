import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { MAX_TASK_LENGTH } from "../hooks/useTodos";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
  onClearError?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, onClearError }) => {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (onClearError) onClearError();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    if (text.trim() && text.trim().length <= MAX_TASK_LENGTH) {
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        maxLength={MAX_TASK_LENGTH}
        onChange={handleChange}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-100 placeholder-slate-400 text-sm"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition duration-200 text-sm"
      >
        Add
      </button>
    </form>
  );
};