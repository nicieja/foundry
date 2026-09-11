import { expect, test } from "vitest";
import { greet } from "./index.ts";

test("greet addresses the name", () => {
  expect(greet("foundry")).toBe("Hello, foundry!");
});
