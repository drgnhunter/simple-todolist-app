import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 border border-rose-500/30 rounded-2xl shadow-xl text-center">
          <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            ⚠️
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            An unexpected error occurred in the Task Manager interface.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl text-sm transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}