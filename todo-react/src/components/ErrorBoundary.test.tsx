import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const ProblemChild = () => {
  throw new Error("Test component crash");
};

describe("ErrorBoundary Component", () => {
  // Suppress console.error in terminal output for expected error throw
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Normal Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Component")).toBeInTheDocument();
  });

  it("renders fallback UI when a child component throws an error", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred in the Task Manager interface.")
    ).toBeInTheDocument();
  });
});