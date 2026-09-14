---
name: pr-description
description: "Draft concise pull request or merge request descriptions from local change evidence. Use for a description, body, or review summary; this workflow does not publish or edit remote requests."
---

# Pull Request Description

1. Inspect the local diff, available commit range, changed files, and supplied issue context. Derive purpose from evidence; do not invent motivation.
2. Draft **Why** (problem or constraint), **What changed** (specific effects), and **Validation** (checks actually run and their results). Distinguish pending or failed checks.
3. Add breaking changes, migration steps, and release risks only when real. Mention removed code or simpler paths when supported. Use a compact comparison table only when it improves clarity.
4. Ask about unresolved intent or release risk only when it changes the description. Omit empty sections, marketing, and implementation dumps.

Use supplied or project-local evidence only. Keep the body self-contained and redact secrets and private data. Drafting does not authorize local writes or remote publication. Save only at an agreed local path with write approval. Report draft status and any missing evidence; never claim a remote request was created or updated.
