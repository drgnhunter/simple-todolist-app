import React, { useState } from "react";

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

  const cancelEdit = () => {
    setEditingId(0);
    setInput2("");
  };

  return (
    <div>
      <h2>Todo List</h2>

      <div>
        <input
          type="text"
          value={input}
          placeholder="Add a new todo..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add Item</button>
      </div>

      <ul>
        {todo.map((item) => (
          <li onDoubleClick={() => startEdit(item)} key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateTodo(item.id)}
                  autoFocus
                />
                <button onClick={() => updateTodo(item.id)}>Save</button>
                <button onClick={() => setInput2("")}>clear</button>
                <button onClick={cancelEdit}>x</button>
              </>
            ) : (
              <span >
                {item.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}