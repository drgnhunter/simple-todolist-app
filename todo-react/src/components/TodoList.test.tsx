import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("TodoList Component Integration", () => {
  it("renders empty state message initially", () => {
    render(<TodoList />);
    expect(screen.getByText("No tasks yet. Add one above!")).toBeInTheDocument();
  });

  it("allows a user to create a task", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Build React App" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Build React App")).toBeInTheDocument();
  });

  it("shows an error banner when submitting an empty task", () => {
    render(<TodoList />);

    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    expect(screen.getByText("Task description cannot be empty.")).toBeInTheDocument();
  });

  it("allows inline editing and saving task text", () => {
    render(<TodoList />);

    // Create task
    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "Initial Task" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // Click edit
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    // Change and save
    const editInput = screen.getByDisplayValue("Initial Task");
    fireEvent.change(editInput, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  it("cancels editing on pressing Escape key", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "Original Text" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    const editInput = screen.getByDisplayValue("Original Text");
    fireEvent.change(editInput, { target: { value: "Draft Text" } });
    fireEvent.keyDown(editInput, { key: "Escape", code: "Escape" });

    expect(screen.getByText("Original Text")).toBeInTheDocument();
  });

  it("deletes a task on clicking Delete button", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "Task to remove" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Task to remove")).not.toBeInTheDocument();
  });
});