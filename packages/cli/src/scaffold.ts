import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  decisionsHeader,
  projectReadme,
  renamePackage,
  roadmapWithGoal,
  templateFiles,
  templateRoot,
} from "./template.ts";

export interface Project {
  name: string;
  goal: string | null;
  target: string;
}

type Transform = (contents: string, project: Project) => string;

const TRANSFORMS = new Map<string, Transform>([
  [
    "package.json",
    (contents, project) => renamePackage(contents, project.name),
  ],
  ["docs/decisions.md", decisionsHeader],
  [
    "docs/roadmap.md",
    (contents, project) =>
      project.goal ? roadmapWithGoal(contents, project.goal) : contents,
  ],
]);

export async function scaffold(project: Project): Promise<void> {
  const root = templateRoot();
  for (const file of templateFiles(root)) {
    await copyInto(project, root, file);
  }
  await write(project, "README.md", projectReadme(project.name));
  await write(project, "packages/.keep", "");
}

async function copyInto(
  project: Project,
  root: string,
  file: string,
): Promise<void> {
  const source = path.join(root, file);
  const transform = TRANSFORMS.get(file);
  if (transform) {
    const contents = await readFile(source, "utf8");
    await write(project, file, transform(contents, project));
    return;
  }
  const target = path.join(project.target, file);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(source, target);
}

async function write(
  project: Project,
  file: string,
  contents: string,
): Promise<void> {
  const target = path.join(project.target, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents);
}
