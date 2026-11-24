// Copies the one-line pickup line to the grading output folder.
// Paths are anchored to this file so the working directory does not matter.
// The entry must stay one line of 1-200 characters; the grader checks length.
// Nothing is printed: stdout must stay empty so only entry.txt is judged.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const text = readFileSync(sourcePath, "utf8");

// Normalize trailing newlines to exactly one: the output stays byte-identical
// for an entry that already ends with a single newline, and never gains a
// second newline if the source is edited later.
const normalized = text.replace(/\n+$/, "") + "\n";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), normalized);
