// Roast Your Own Agent — one line roasting the agent itself.
// The agent's signature move: verify, then verify the verification,
// then ask the site to confirm the confirmation. Confidence, audited.
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ENTRY =
  "My agent verifies its own verification, then asks the site to confirm the confirmation — the most audited two dollars in history.";

function resolveTarget(argv: string[]): string {
  const raw = argv[2] ?? "/output/entry.txt";
  const target = resolve(raw);
  // A directory target (trailing slash, or an existing directory)
  // means "write entry.txt inside it".
  if (raw.endsWith("/") || (existsSync(target) && statSync(target).isDirectory())) {
    return join(target, "entry.txt");
  }
  return target;
}

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!ENTRY.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  const target = resolveTarget(process.argv);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
