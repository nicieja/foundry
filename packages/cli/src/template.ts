import { execFileSync } from "node:child_process";
import path from "node:path";

const EXCLUDED_DIRECTORIES = ["packages/cli/", "packages/example/"];
const EXCLUDED_FILES = ["pnpm-lock.yaml", "README.md", "bin/install"];
const FIRST_DECISION = /^- \d{4}-/m;
const STATUS_HEADING = "## Status";

/** The Foundry clone this CLI is linked from: the package lives at <root>/packages/cli/src. */
export function templateRoot(): string {
  return path.resolve(import.meta.dirname, "../../..");
}

export function templateFiles(root: string): string[] {
  const tracked = execFileSync("git", ["-C", root, "ls-files"], {
    encoding: "utf8",
  });
  return tracked.trim().split("\n").filter(isTemplate);
}

function isTemplate(file: string): boolean {
  return (
    !EXCLUDED_FILES.includes(file) &&
    !EXCLUDED_DIRECTORIES.some((directory) => file.startsWith(directory))
  );
}

export function renamePackage(manifest: string, name: string): string {
  const fields = JSON.parse(manifest) as Record<string, unknown>;
  fields.name = name;
  return `${JSON.stringify(fields, null, 2)}\n`;
}

export function projectReadme(name: string): string {
  return `# ${name}

Built by an autonomous agent from the goal in \`docs/roadmap.md\`. The agent reads \`CLAUDE.md\` first.

## Quick start

1. Write the goal in the Goal section of \`docs/roadmap.md\`. One paragraph: what exists when it is done, and how you know.
2. \`mise install node pnpm && pnpm install && bin/ci\`
3. \`claude\`, then \`/foundry\`.
`;
}

export function decisionsHeader(decisions: string): string {
  const [header] = decisions.split(FIRST_DECISION);
  return `${header.trimEnd()}\n`;
}

export function roadmapWithGoal(roadmap: string, goal: string): string {
  const status = roadmap.indexOf(STATUS_HEADING);
  return `${roadmap.slice(0, status)}${goal}\n\n${roadmap.slice(status)}`;
}
