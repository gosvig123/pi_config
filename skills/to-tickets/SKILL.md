---
name: to-tickets
description: "Turn an explicitly requested plan or conversation into approved, independently verifiable local Markdown ticket drafts with blockers. This workflow does not publish remote issues or implement tickets."
disable-model-invocation: true
---

# To Tickets

Use only when explicitly requested. A vertical slice is a narrow, complete path through relevant layers with an observable result.

## Draft and approve

1. Read the conversation, supplied specifications and issue text, and relevant local code, domain language, and decisions. Ask for missing evidence rather than fetching external material.
2. Identify confirmed baseline scope. Keep optional extensions separate and unticketed until selected.
3. Draft small end-to-end slices that fit one focused work session. Add only genuine blockers. Sequence necessary preparatory refactoring first; omit speculative cleanup.
4. Show a numbered breakdown with title, blockers, and end-to-end delivery. Obtain approval of scope, granularity, and dependencies; revise until approved.

For wide mechanical refactors, use **expand-contract**: add the new form beside the old, migrate callers in bounded tickets, then remove the old form after all migrations. Keep checks passing between batches. If batches cannot pass independently, state that limit and require a final integrate-and-verify ticket blocked by all batches; promise passing checks only at integration.

## Local destination and writes

A `local` invocation target selects local drafting for this run, not write authority. A `github` target is unsupported here: explain the local-only limit and ask whether to draft locally or stop. Never switch silently. If targets conflict, resolve them before writing.

After breakdown approval, confirm an agreed repository-local directory and file-write authority. Do not infer either from tracker configuration or alter that configuration. Save blockers first, one Markdown file per ticket, numbered from `01` with a short title slug. Preserve existing files; inspect numbering before creation.

Each ticket contains **Title**, **Source parent** if supplied, **What to build**, **Blockers** by number and title or none, **Status: ready-for-agent**, and observable **Acceptance criteria**. The status means ready for handoff, not permission to start blocked work. Use behavior rather than layer inventories; retain only decision-rich snippets with their local origin.

Do not publish remotely, modify a parent issue, add metadata side effects, or implement tickets. Redact secrets and private data. Report saved paths and incomplete writes; never claim unsaved drafts were created. If implementation is separately authorized later, start only a ticket whose blockers are complete.
