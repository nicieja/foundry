import { mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, expect, test } from "vitest";
import { scaffold, templateRoot } from "./index.ts";

const GOAL = "An app that earns $1m.";

let workspace: string;
let withGoal: string;
let withoutGoal: string;

beforeAll(async () => {
  workspace = await mkdtemp(path.join(tmpdir(), "foundry-cli-"));
  withGoal = path.join(workspace, "my-app");
  withoutGoal = path.join(workspace, "goalless-app");
  await scaffold({ name: "my-app", goal: GOAL, target: withGoal });
  await scaffold({ name: "goalless-app", goal: null, target: withoutGoal });
});

afterAll(async () => {
  await rm(workspace, { recursive: true });
});

function read(project: string, file: string): Promise<string> {
  return readFile(path.join(project, file), "utf8");
}

test("names the project in the manifest and the README", async () => {
  const manifest = JSON.parse(await read(withGoal, "package.json")) as {
    name: string;
  };
  expect(manifest.name).toBe("my-app");
  expect(await read(withGoal, "README.md")).toMatch(/^# my-app$/m);
});

test("keeps the decision log's header and none of its entries", async () => {
  const decisions = await read(withGoal, "docs/decisions.md");
  expect(decisions).toContain("# Decisions");
  expect(decisions).not.toMatch(/^- \d{4}-/m);
});

test("leaves packages empty, without the template's own", async () => {
  expect(await readdir(path.join(withGoal, "packages"))).toEqual([".keep"]);
});

test("leaves behind the template's own install script", async () => {
  expect(await readdir(path.join(withGoal, "bin"))).toEqual([
    "ci",
    "evidence-check",
  ]);
});

test("keeps bin/ci executable", async () => {
  const { mode } = await stat(path.join(withGoal, "bin/ci"));
  expect(mode & 0o111).toBe(0o111);
});

test("writes the goal into the roadmap's Goal section", async () => {
  const roadmap = await read(withGoal, "docs/roadmap.md");
  expect(roadmap).toContain(GOAL);
  expect(roadmap.indexOf(GOAL)).toBeLessThan(roadmap.indexOf("## Status"));
});

test("copies the roadmap verbatim without a goal", async () => {
  expect(await read(withoutGoal, "docs/roadmap.md")).toBe(
    await read(templateRoot(), "docs/roadmap.md"),
  );
});
