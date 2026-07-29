import React from "react";
import { TodoList } from "./components/TodoList";
import { ErrorBoundary } from "./components/ErrorBoundary";
export const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <ErrorBoundary>
        <TodoList />
      </ErrorBoundary>
    </main>
  );
};

export default App;
