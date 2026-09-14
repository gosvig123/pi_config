---
name: context-gardener
description: "Keep project domain language accurate. Use for a context delta check or an evidenced change to terms, relationships, or ambiguities; not merely because context files are missing."
---

# Context Gardener

## Delta check

Did the task reveal or correct a durable project term, relationship, or ambiguity? Require evidence from code, existing project text, or an explicit user statement. If not, stop without edits. Do not create scaffolds, record implementation-only changes, or write during read-only work.

## Update

1. Read project-local `CONTEXT-MAP.md` if present. It lists each context, its local location, purpose, and relationships to other contexts. Otherwise use root `CONTEXT.md`. Ask if the boundary is unclear.
2. Read existing context before editing. Merge or tighten entries; preserve its voice. Create a file only for evidenced domain facts and within authorized write scope.
3. Use the inline format below. Mark weakly supported rules and conflicting names unresolved; ask before asserting a resolution.
4. Report the path and exact terms or relationships changed, or why no delta exists.

## Inline context format

- Title: context name, followed by one or two sentences about its purpose.
- **Language:** canonical term in bold, one-sentence definition of what it is, and meaningful aliases to avoid. Group terms only when useful.
- **Relationships:** statements using canonical terms; include cardinality only when known.
- **Flagged ambiguities:** conflicting meanings, evidence, and either an evidenced resolution or an explicit unresolved status.
- Optional example dialogue: only a real, evidenced exchange. Never invent dialogue.

Omit empty sections. Exclude function inventories, schema dumps, build commands, test strategy, temporary decisions, and generic programming concepts. Do not invent business rules or domain boundaries.
