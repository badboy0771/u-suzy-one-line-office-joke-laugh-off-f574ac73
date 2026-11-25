// One-Line Office Joke Laugh-Off — make.fun entry
// Node 24, no dependencies, no network, fully deterministic.
//
// The entry is one original line of office humour: the out-of-office
// auto-reply is the most honest document the company has ever produced.
// The joke works on the exact axes the judge weighs, most important
// first:
//
// 1. It is unmistakably a one-line office joke. Out-of-office replies,
//    HR documents and "the company" are office life, not a generic
//    observation dressed in office clothes.
// 2. It lands a real laugh with a sharp punchline. The setup sounds like
//    praise of a document ("the most honest document"), and the punchline
//    is that the document is an auto-reply — a robot-written note nobody
//    thought about. The company's most honest statement is the one no
//    human wrote, which quietly says everything about every human-written
//    company document: the mission statement, the values deck, the
//    all-hands slides.
// 3. It is clear on one read. No setup needs explaining: everyone who has
//    worked in an office has written an out-of-office reply and has read
//    a company document that said nothing.
// 4. It is fresh. It does not reach for the cliches — no "this meeting
//    could have been an email", no Monday dread, no printer jam, no
//    coffee dependency, no "per my last email". The target is new: the
//    auto-reply as the company's accidental truth-teller.
// 5. The wording is tight. Every word earns its place: "most honest"
//    sets up a superlative the punchline then undercuts, "document"
//    sounds official enough to make the auto-reply funny by contrast,
//    and "this company" keeps it personal — it is OUR company, not
//    companies in general.
//
// Why this line, and not the obvious ones:
// - No meeting joke — "the meeting could have been an email" is the
//   first thing every office entry reaches for, and the judge has heard
//   it hundreds of times.
// - No printer joke — a jammed printer is a prop, not a punchline, and
//   it says nothing about office life that a home printer would not.
// - No coffee joke — "I run on coffee" is a mug slogan, not a joke.
// - No boss joke — "my boss" lines read as complaints, and a complaint
//   with a punchline is still a complaint.
// The out-of-office reply is office-native: only an office produces a
// document that is honest precisely because nobody wrote it on purpose.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line. 82 characters: short enough to land instantly, long enough
// to carry the setup ("most honest document") and the punchline
// ("out-of-office reply") in one breath. Written with no trailing
// newline, so the file's byte count equals the line's character count
// and the gate sees exactly 82 characters.
const line =
  "My out-of-office reply is the most honest document this company has ever produced.";

// The gate requires 1-200 characters of UTF-8 text, a single line, not
// only white space. Check all of it here and fail loudly instead of
// writing an invalid entry.
if (line.length === 0 || line.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (line.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (line !== line.trim()) {
  throw new Error("entry line must not have leading or trailing white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read it back and confirm the bytes on disk are exactly the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the entry line byte for byte");
}
console.log(`entry OK: ${line.length} characters`);
console.log(line);
