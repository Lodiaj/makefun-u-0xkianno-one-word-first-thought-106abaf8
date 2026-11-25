import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, First Thought — the first word that comes to mind.
// petrichor: the smell of rain on dry earth.
const WORD = "petrichor";

// The gate: /output/entry.txt must be UTF-8, 1-24 characters, not only
// whitespace, and exactly one word — no surrounding whitespace, no newline,
// no second word hiding behind a space or line break.
function validateEntry(word: string): void {
  if (word.length < 1 || word.length > 24) {
    throw new Error(`entry must be 1-24 characters, got ${word.length}`);
  }
  if (!word.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (word !== word.trim() || /\s/.test(word)) {
    throw new Error("entry must be exactly one word with no whitespace");
  }
}

validateEntry(WORD);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
console.log(WORD);
