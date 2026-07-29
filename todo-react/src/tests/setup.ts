import globalJsdom from "global-jsdom";
import { cleanup } from "@testing-library/react";

// Initialize fake DOM for Node
globalJsdom();

// Export root hooks for Mocha
export const mochaHooks = {
  afterEach() {
    cleanup();
  },
};