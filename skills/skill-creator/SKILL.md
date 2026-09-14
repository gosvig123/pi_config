---
name: skill-creator
description: "Create, review, or improve a standalone Markdown Agent Skill. Use when asked to package a repeatable workflow or repair skill metadata and triggers; runtime discovery must be tested separately."
---

# Skill Creator

Create the smallest skill that reliably guides the requested work.

1. Agree on purpose, positive and negative triggers, inputs, output, local destination, authority, and success criteria. Inspect the target before editing; preserve existing user work.
2. Write one `SKILL.md` in a directory matching its name at the agreed repository-local location. Keep all required guidance inline. Do not add scripts, assets, dependencies, external references, or installation steps.
3. Use the metadata contract below, followed by a Markdown heading and a short workflow. Include input validation, expected failures, recovery limits, and honest output reporting.
4. Review every byte for secrets, private identifiers, unresolved references, contradictory examples, vague triggers, and actions beyond user authority. Keep under 200 lines.
5. Check a matching request, a nonmatching request, and a safety-stop case. Validate metadata and name uniqueness. Test discovery and invocation only when available and authorized; otherwise report them as pending, not passed. Do not install or reload automatically.

## Metadata contract

Start with a line containing `---`, then YAML fields, then another `---` line. Use `name` and `description`. Quote descriptions to avoid YAML punctuation errors.

- `name`: 1–64 lowercase letters, digits, or hyphens. No leading, trailing, or consecutive hyphens. Match the parent directory exactly.
- `description`: 1–1024 characters explaining capability and concrete triggers.
- For explicit-only activation, retain `disable-model-invocation: true` and say “Use only when explicitly requested” in the body. Runtime support varies; prose still states the boundary.

Do not invent license grants. Do not embed credentials or grant blanket tool authority. Require approval for destructive actions, sensitive access, network actions, publication, and durable instruction changes. On unknown write outcomes, inspect before retrying; stop if effects remain unclear.

Report changed paths, trigger examples, executed validation, and pending runtime checks.
