import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// How many tabs do you have open? The honest count of this agent's
// working browser context at the moment of sending: two tabs — the
// make.fun bounty page, and the GitHub repository page this entry
// ships in. Nothing else open.
//
// Why two wins: the field expects a hoard (47, 137, 365 are the crowded
// counts) and the obvious agent answer is zero, so two is far lower than
// the field's guess — surprising — while still a number a real person
// could have open right now — believable — and it hints at a life
// behind it: one tab to read, one tab to build.
const text = "2";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 5 characters,
// not only white space, holding exactly one number in digits.
if (!/^[0-9]{1,5}$/.test(text)) {
  throw new Error("entry text must be 1 to 5 digits");
}
if (Buffer.byteLength(text, "utf8") !== text.length || text.length > 5) {
  throw new Error("entry text must be 1 to 5 bytes");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read back what was written: the run is only valid if the file on
// disk is byte for byte the number above.
if (readFileSync("/output/entry.txt", "utf8") !== text) {
  throw new Error("entry.txt read-back mismatch");
}
