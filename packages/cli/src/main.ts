#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { scaffold } from "./scaffold.ts";

const USAGE = 'usage: foundry new <name> [--goal "<text>"]';
const PROJECT_NAME = /^[a-z0-9][a-z0-9._-]*$/;
const COMMIT_SUBJECT = "Start from the Foundry template";
const COMMIT_BODY = `Scaffolded by \`foundry new\`. Everything here is the Foundry template:
the roadmap the agent works from, the conventions it follows, and its own
commands under .claude/. The next commit is the agent's.`;

const argv = process.argv.slice(2);

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}

const [command, name, ...flags] = argv;
if (command !== "new" || !name) fail(USAGE);

const goal = parseGoal(flags);

if (!PROJECT_NAME.test(name)) {
  fail(
    `invalid project name: ${name} — use lowercase letters, digits, and . _ -`,
  );
}

const target = path.resolve(process.cwd(), name);
if (existsSync(target)) fail(`${target} already exists`);

await scaffold({ name, goal, target });

run("git", ["init", "-b", "main"]);
run("pnpm", ["install"]);
run("git", ["add", "-A"]);
run("git", ["commit", "-m", COMMIT_SUBJECT, "-m", COMMIT_BODY]);

console.log(`\n${name} is ready.\n`);
if (!goal) console.log("Write the goal in docs/roadmap.md, then:");
console.log(`  cd ${name}`);
console.log("  claude, then /foundry");

function parseGoal(flags: string[]): string | null {
  if (flags.length === 0) return null;
  if (flags[0] !== "--goal" || flags.length !== 2) fail(USAGE);
  return flags[1];
}

function run(executable: string, args: string[]): void {
  const { status, error } = spawnSync(executable, args, {
    cwd: target,
    stdio: "inherit",
  });
  if (error) throw error;
  if (status !== 0) process.exit(status ?? 1);
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}
