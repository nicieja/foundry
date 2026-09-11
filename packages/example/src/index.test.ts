import { expect, test } from "vitest";
import { greet } from "./index.ts";

test("greet addresses the name", () => {
  expect(greet("factory")).toBe("Hello, factory!");
});
