---
name: blast-radius
description: "Find what a change could break beyond its diff and test its safety assumptions. Use for change-risk reviews or questions about downstream impact."
---

# Blast Radius

1. Inspect the diff, available history, relevant code, and callers. State both visible changes and indirect effects.
2. Identify the facts required for safety. Trace realistic failure paths through timing, teardown, serialization, stored fields, flags, and downstream consumers. Inspect local dependency source, pinned versions, and patches when relevant.
3. Cite real local file and line evidence. Never invent callers or interfaces. Separate confirmed risks, checked-and-cleared cases, and unproven assumptions.
4. Test decisive facts with existing checks or a small boundary-level check when authorized and practical. Report the command and observed result. If execution is unavailable, costly, or disruptive, mark the fact unproven; obtain approval for disruptive tests.

## Report

State what changed, affected boundaries, each safety assertion and evidence type, plausible failure path, likelihood, impact, and cheapest remaining verification. Source inspection is not an executed test. Keep unrun checks explicit.

Review does not authorize fixes or publication. Preserve user work. Remove private data before sharing; never publish without explicit approval.
