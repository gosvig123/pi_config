---
name: visual-explanations
description: "Clarify architecture, processes, tradeoffs, bugs, or changes with self-contained Markdown comparison and relationship tables. Use for a visual explanation; no canvas, image, or diagram renderer is provided."
---

# Visual Explanations

Use the smallest readable Markdown table that answers the question. Skip factual one-liners and requests for no visual. This workflow produces tables, not rendered diagrams or interactive artifacts; state that limit for requests needing those formats.

1. Identify the main question and inspect supplied or project-local evidence. Use established domain names. For changes, inspect the diff and affected boundaries; the table supplements change notes.
2. Choose columns by purpose: **Option / Benefit / Cost** for tradeoffs; **Step / Trigger / Result** for a process; **Source / Relationship / Target / Evidence** for structure; **Cause / Effect / Evidence** for a bug.
3. Mark current and proposed behavior separately. Trace actual triggers and concrete supplied incidents. Label unknown relationships explicitly; do not fill gaps with plausible behavior.
4. Keep one reading order, short labels, consistent terms, and useful whitespace. Split dense tables rather than compressing text. Merge repeated entries and omit decoration or duplicated prose. Do not encode meaning by color alone.
5. Read the complete Markdown result. Check purpose, ordering, start and end where relevant, labels, evidence, and uncertainty. If rendered inspection is unavailable, state that only source text was reviewed.

Give a short explanation and any approved saved path. Redact private data. Do not write files without authority or publish remotely. Never claim visual validation, runtime behavior, or interaction that was not inspected.
