import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { truncateToWidth } from "@earendil-works/pi-tui";
import { execFile } from "node:child_process";
import { promisify, stripVTControlCharacters } from "node:util";

const UNSAFE_CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

export function safeText(value: string): string {
  return stripVTControlCharacters(value)
    .replaceAll("\r", "")
    .replaceAll("\t", "  ")
    .replace(UNSAFE_CONTROL, "�");
}

const exec = promisify(execFile);
const ID = "git-changes";
const MAX_FILES = 8;

// Porcelain -z preserves spaces and returns rename destination before source.
export function statusLines(output: string): string[] {
  const records = output.split("\0");
  const lines: string[] = [];
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (!record) continue;
    if (record.length < 4 || record[2] !== " ") throw new Error("Invalid Git status record");
    const code = record.slice(0, 2);
    const path = JSON.stringify(record.slice(3));
    if (/[RC]/.test(code)) {
      const source = records[++i];
      if (!source) throw new Error("Missing Git rename source");
      lines.push(`${code} ${JSON.stringify(source)} → ${path}`);
    } else lines.push(`${code} ${path}`);
  }
  return lines;
}

export default function gitStatusWidget(pi: ExtensionAPI) {
  let hidden = false;
  let generation = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  async function refresh(ctx: ExtensionContext) {
    if (ctx.mode !== "tui") return;
    const version = ++generation;
    if (hidden) {
      ctx.ui.setWidget(ID, undefined);
      return;
    }
    let lines: string[];
    try {
      const { stdout } = await exec("git", ["--no-optional-locks", "status", "--porcelain=v1", "-z", "--untracked-files=all"], {
        cwd: ctx.cwd, timeout: 2000, maxBuffer: 2 * 1024 * 1024,
      });
      const files = statusLines(stdout);
      // ponytail: file status only; add line totals only with exact binary/rename accounting.
      lines = [`Git · ${files.length ? `${files.length} changed paths` : "clean"} · /git-changes toggle`, ...files.slice(0, MAX_FILES)];
      if (files.length > MAX_FILES) lines.push(`… ${files.length - MAX_FILES} more paths`);
    } catch (error) {
      const cause = error instanceof Error ? error.message : String(error);
      lines = [`Git status unavailable: ${cause}`, "Run git status in the working directory to diagnose; refresh on next input."];
    }
    if (version !== generation) return;
    ctx.ui.setWidget(ID, () => ({
      render: (width) => lines.map(line => truncateToWidth(safeText(line).replaceAll("\n", " "), width)),
      invalidate() {},
    }));
  }

  function stop() {
    generation++;
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  pi.registerCommand(ID, {
    description: "Toggle Git file status (no line totals)",
    handler: async (_args, ctx) => { hidden = !hidden; await refresh(ctx); },
  });
  pi.on("session_start", async (_event, ctx) => {
    stop();
    hidden = false;
    if (ctx.mode !== "tui") return;
    timer = setInterval(() => void refresh(ctx), 2000);
    await refresh(ctx);
  });
  pi.on("input", async (_event, ctx) => { await refresh(ctx); return { action: "continue" }; });
  pi.on("tool_execution_end", async (_event, ctx) => { await refresh(ctx); });
  pi.on("session_shutdown", async (_event, ctx) => {
    stop();
    if (ctx.mode === "tui") ctx.ui.setWidget(ID, undefined);
  });
}
