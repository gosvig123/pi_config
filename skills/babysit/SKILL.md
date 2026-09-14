---
name: babysit
description: "Monitor a local engineering process or review supplied run evidence, recover from safe minor failures, and revalidate. Use when asked to babysit a process; remote monitoring and deployment are outside this workflow."
---

# Babysit

1. Establish the process, stages, revision, environment, healthy signal, monitoring interval, and time limit. Inspect available local status, logs, and artifacts before acting. Supplied remote evidence is a snapshot, not live status.
2. Monitor until success, failure, timeout, cancellation, or required approval. Capture failed stage, operation, exact error, revision, and known side effects. Redact sensitive data.
3. Fix only authorized minor issues with a clear cause: low-risk, reversible, and local to the process. Preserve useful work and keep one writer in the worktree.
4. Retry a transient failure at most once, only for a safe read or an operation known to have no additional effect when repeated, or when a mutation clearly never started. Never retry a mutation with uncertain outcome. Stop after repeated failure, including a failed repaired retry.
5. Run the narrow failing check and required broader checks after a fix. Resume against the new revision only within the agreed scope and time bound.

## Stop boundaries

Stop for cancellation, secrets, credentials, authentication, permissions, legal acceptance, migrations, production data, billing, destructive infrastructure changes, broad dependency upgrades, architecture changes, security controls, unclear service state, force-push, or user-impacting rollback. Never change production environment values, suppress checks, or weaken validation.

Do not deploy, publish, or perform remote operations. If supplied evidence shows unhealthy production, stop changes and request an owner decision. A rollback recommendation needs a known target and effects; it is not execution authority.

## Report

State process and revision, observed stages, evidence, issue classification, fix and files, checks and results, and residual risk or exact recovery decision. Distinguish local check success, reported deployment state, and verified health. Do not infer deployment or health from a successful build. Missing logs, mismatched revisions, conflicting checks, or unavailable health evidence prevent a healthy claim.
