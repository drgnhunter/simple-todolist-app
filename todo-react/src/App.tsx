import React, { useState } from "react";
import "./output.css";
interface Todo {
  id: number;
  text: string;
}

export default function TodoList() {
  const [todo, setToDo] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number>();
  const [input2, setInput2] = useState<string>("");

  const addTodo = () => {
    if (!input.trim()) return;

    const newItem: Todo = {
      id: Date.now(),
      text: input,
    };

    setToDo((prevItems) => [...prevItems, newItem]);
    setInput("");
  };

  const startEdit = (item: Todo) => {
    setEditingId(item.id);
    setInput2(item.text);
  };

  const updateTodo = (todoId: number) => {
    if (!input2.trim()) return;

    const updatedTodos = todo.map((t) => {
      if (t.id === todoId) {
        return {
          ...t,
          text: input2,
        };
      }
      return t;
    });

    setToDo(updatedTodos);
    setEditingId(0);
    setInput2("");
  };

  const deleteTodo = (todoId: number) => {

    setToDo(todo.filter((item) => item.id !== todoId));

   
  };

  const cancelEdit = () => {
    setEditingId(0);
    setInput2("");
  };

 return (
  <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Todo List</h2>
        <p className="text-xs text-slate-400 mt-1">Double-click any item to edit</p>
      </div>

      {/* Input Group */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="flex-1 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
        <button
          onClick={addTodo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {todo.map((item) => (
          <li
            key={item.id}
            onDoubleClick={() => startEdit(item)}
            className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-slate-100/60 transition-all duration-200"
          >
            {editingId === item.id ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateTodo(item.id)}
                  autoFocus
                  className="flex-1 bg-white text-slate-800 text-sm rounded-lg px-3 py-1.5 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => updateTodo(item.id)}
                  className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => setInput2("")}
                  className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1.5"
                >
                  Clear
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-xs text-rose-500 hover:text-rose-700 px-2 py-1.5 font-semibold"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-slate-700 select-none">
                  {item.text}
                </span>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="text-xs font-medium text-rose-500 opacity-0 group-hover:opacity-100 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
