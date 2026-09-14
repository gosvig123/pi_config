// Run: PI_TEST_PACKAGE="$(npm root -g)/@earendil-works/pi-coding-agent" node --test tests/*.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, writeFile, chmod } from "node:fs/promises";
import { stripVTControlCharacters } from "node:util";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { parsePatch } from "../.pi/extensions/hunk-inline/patch.ts";
import { safeText } from "../.pi/extensions/hunk-inline/sanitize.ts";

const theme = { fg: (_color, text) => text, bold: text => text };
const root = resolve(import.meta.dirname, "..");
const packageDir = process.env.PI_TEST_PACKAGE;
assert.ok(packageDir, "Set PI_TEST_PACKAGE to the installed Pi coding-agent package directory");
const { discoverAndLoadExtensions } = await import(pathToFileURL(join(packageDir, "dist/core/extensions/loader.js")));

async function isolated(run) {
  const dir = await mkdtemp(join(tmpdir(), "pi-extensions-test-"));
  try {
    const loaded = await discoverAndLoadExtensions([], root, dir);
    assert.deepEqual(loaded.errors, []);
    assert.equal(loaded.extensions.length, 3);
    await run(loaded.extensions, dir);
  } finally { await rm(dir, { recursive: true, force: true }); }
}

const extension = (all, suffix) => all.find(item => item.path.endsWith(suffix));
const emit = async (ext, name, event, ctx) => {
  let result;
  for (const handler of ext.handlers.get(name) ?? []) result = await handler(event, ctx);
  return result;
};

test("wait-what registers a prompt hook and preserves the chained prompt", async () => isolated(async all => {
  const ext = extension(all, "wait-what.ts");
  const result = await emit(ext, "before_agent_start", { systemPrompt: "Existing rules" });
  assert.ok(result.systemPrompt.startsWith("Existing rules\n"));
  assert.match(result.systemPrompt, /short, active sentences and common words/);
  assert.doesNotMatch(result.systemPrompt, /ASD-STE100/);
}));

test("hunk-inline parses line numbers, CRLF, markers, creation and terminal controls", () => {
  const parsed = parsePatch("@@ -2,2 +2,3 @@\r\n same\r\n---flag\r\n+++count\r\n+new\r\n\\ No newline at end of file");
  assert.equal(parsed.additions, 2);
  assert.equal(parsed.removals, 1);
  assert.deepEqual(parsed.rows[2], { kind: "remove", text: "--flag", oldLine: 3 });
  assert.deepEqual(parsed.rows[3], { kind: "add", text: "++count", newLine: 3 });
  assert.equal(parsed.rows.at(-1).kind, "meta");
  assert.deepEqual(parsePatch("@@ -0,0 +1 @@\n+first").rows.at(-1), { kind: "add", text: "first", newLine: 1 });
  assert.deepEqual(parsePatch("diff --git a/x b/x\nindex 1..2").rows, []);
  assert.equal(safeText("ok\t\u001b[31mred\u001b[0m\u0001"), "ok  red�");
});

test("hunk-inline registers native write/edit and renders actual isolated mutations", async () => isolated(async (all, dir) => {
  const ext = extension(all, "hunk-inline/index.ts");
  const write = ext.tools.get("write").definition;
  const edit = ext.tools.get("edit").definition;
  const ctx = { cwd: dir };
  const args = { path: "sample.ts", content: "old\n" };
  assert.match(write.renderCall(args, theme, {}).render(80).join("\n"), /write.*sample.ts/);
  assert.match(edit.renderCall({ path: args.path, edits: [] }, theme, {}).render(80).join("\n"), /0 block/);
  const result = await write.execute("write-1", args, undefined, undefined, ctx);
  assert.equal(await readFile(join(dir, args.path), "utf8"), args.content);
  const row = { args, toolCallId: "write-1", state: {}, isError: false };
  const rendered = write.renderResult(result, {}, theme, row).render(80).join("\n");
  assert.match(rendered, /Hunk · \+1 −0/);
  assert.match(write.renderResult(result, {}, theme, row).render(80).join("\n"), /Hunk/);
  const editArgs = { path: args.path, edits: [{ oldText: "old", newText: "new" }] };
  const edited = await edit.execute("edit-1", editArgs, undefined, undefined, ctx);
  assert.equal(await readFile(join(dir, args.path), "utf8"), "new\n");
  const view = edit.renderResult(edited, {}, theme, { args: editArgs, state: {}, isError: false });
  assert.match(view.render(80).join("\n"), /Hunk · \+1 −1/);
  assert.ok(view.render(5).every(line => [...stripVTControlCharacters(line)].length <= 5));
  assert.match(write.renderResult(result, {}, theme, { ...row, toolCallId: "missing", state: {} }).render(80).join("\n"), /diff unavailable/);
  assert.match(edit.renderResult({ content: [{ type: "text", text: "Failed\u001b[31m!" }] }, {}, theme, { isError: true }).render(80).join("\n"), /Failed!/);
  await assert.rejects(edit.execute("bad", { path: "missing.txt", edits: [{ oldText: "a", newText: "b" }] }, undefined, undefined, ctx));
}));

test("git-status-widget registers refresh, toggle, cleanup and reports non-repository errors", async () => isolated(async (all, dir) => {
  const ext = extension(all, "git-status-widget.ts");
  let widget;
  const ctx = { cwd: dir, mode: "tui", ui: { setWidget: (_id, value) => { widget = value; } } };
  try {
    await emit(ext, "session_start", {}, ctx);
    assert.match(widget().render(200).join("\n"), /Git status unavailable/);
    assert.match(widget().render(200).join("\n"), /Run git status/);
    assert.deepEqual(await emit(ext, "input", {}, ctx), { action: "continue" });
    await ext.commands.get("git-changes").handler("", ctx);
    assert.equal(widget, undefined);
    await ext.commands.get("git-changes").handler("", ctx);
    assert.equal(typeof widget, "function");
  } finally { await emit(ext, "session_shutdown", {}, ctx); }
  assert.equal(widget, undefined);
  await emit(ext, "session_start", {}, { ...ctx, mode: "print" });
  assert.equal(widget, undefined);
}));

test("git-status-widget renders synthetic rename, spaces, binary status, overflow and clean state", async () => isolated(async (all, dir) => {
  const ext = extension(all, "git-status-widget.ts");
  const git = join(dir, "git");
  const originalPath = process.env.PATH;
  let widget;
  const ctx = { cwd: dir, mode: "tui", ui: { setWidget: (_id, value) => { widget = value; } } };
  async function output(text) {
    await writeFile(git, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(text)});\n`);
    await chmod(git, 0o700);
    await emit(ext, "tool_execution_end", {}, ctx);
    return widget().render(200).join("\n");
  }
  try {
    process.env.PATH = dir;
    const rendered = await output('R  new name.bin\0old name.bin\0 M image.bin\0?? spaced file \0?? line\nbreak\0');
    assert.match(rendered, /4 changed paths/);
    assert.match(rendered, /"old name.bin" → "new name.bin"/);
    assert.match(rendered, / M "image.bin"/);
    assert.ok(rendered.includes('"spaced file "'));
    assert.ok(rendered.includes('"line\\nbreak"'));
    assert.doesNotMatch(rendered, /\+0|−0|Total:/);
    assert.match(await output(Array.from({ length: 10 }, (_, i) => `?? file${i}\0`).join("")), /2 more paths/);
    assert.match(await output(""), /Git · clean/);
    assert.match(await output("R  destination\0"), /Missing Git rename source/);
  } finally {
    process.env.PATH = originalPath;
    await emit(ext, "session_shutdown", {}, ctx);
  }
}));
