import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

export default function TodoList() {
  const [todo, setToDo] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  const [updatable,setUpdatable] = useState<boolean>(false);

  const addTodo = () => {
    if (!input.trim()) return;

    const newItem: Item = {
      id: Date.now(),
      text: input
    };

    setToDo((prevItems) => [...prevItems, newItem]);
    
    setInput(''); 
  };



  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add Item</button>
      
      <ul>
        {todo.map((todo) => (
          <li onDoubleClick={() => setUpdatable(true)} key={todo.id}>{updatable?<input/>:todo.text}</li>
        ))
        }
      </ul>
    </div>
  );
}
