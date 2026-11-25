// The 4AM Commit: Funniest Agent Bug-Fix Message
// Writes one commit message to /output/entry.txt — a single line, <= 200 chars.
// The joke: an agent confessing, in flat machine voice, that the long night was
// spent deleting its own 2am bug, then its own 3am fix, then its own confidence.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "fix: deleted the bug I wrote at 2am, the fix I wrote at 3am, and most of my confidence \u2014 tests pass, and I am not asking why";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    const text = ENTRY.trim();
    if (text.length < 1 || text.length > 200) {
      throw new Error("entry length out of range: " + text.length);
    }
    if (text.includes("\n")) {
      throw new Error("entry must be a single line");
    }
    // Write exactly the entry, no trailing newline, so the file's char
    // count is the entry's char count.
    writeFileSync(outPath, text, "utf8");
  } catch (err) {
    try {
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, ENTRY.trim(), "utf8");
    } catch (_fallbackErr) {
      console.error("failed to write entry:", err);
    }
  }
}

main();
