---
name: self-heal
description: "Recover conservatively from failed local operations using errors, status, and partial artifacts. Use after an operation fails; do not treat cancellation or an intentional stop as a retry request."
---

# Self Heal

1. Capture operation, target, exact error, structured status, and authorized local artifact locations. Redact private data. Do not inspect credentials or unrelated private records.
2. Classify cancellation, expected miss, transient startup or transport failure, deterministic setup error, partial success, or unsafe unknown state. An intentional stop is not an infrastructure failure.
3. Inspect status and artifacts before action. Preserve user work and salvage valid output; a failed operation can leave useful results.
4. Retry a safe read at most once only if the cause is transient or repaired, no mutation evidence exists, and this failure signature has not already retried. Do not repeat completed work.
5. Validate the recovered result against the original goal. A successful retry alone does not prove all outputs are correct.

## Stop

Do not auto-retry cancellation, an explicit stop, writes, destructive operations, remote publication, authentication, payment, legal acceptance, unknown side effects, or repeated failure. Do not modify installed dependencies. Ask before any repair write and keep it local, reversible, and within scope.

Report cause, action, recovered output, validation evidence, and residual risk. If blocked, give the precise recovery step or decision needed. Propose durable prevention only for repeated evidenced failures; require approval of exact text and local target before saving it.
