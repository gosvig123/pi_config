---
name: diagnose
description: "Diagnose uncertain bugs, intermittent failures, or performance regressions with reproduction and controlled tests. Use for unresolved failures; directly evidenced fixes need only targeted verification."
---

# Diagnose

Read relevant project context and recorded decisions. If the cause is directly evidenced, use the smallest authorized fix and targeted verification. Otherwise use this loop.

## Reproduce

1. Build the smallest runnable check of the symptom using an existing test boundary, local request, assertion, or captured-input replay. Confirm the original failure and exact output or timing.
2. Narrow inputs and control time, randomness, files, and external effects. Use a temporary harness, differential comparison, or bisection only when useful.
3. For a human-only step, give one precise action, wait for completion, then ask for expected versus observed behavior and sanitized error text or timing. Do not infer success from silence.
4. For intermittent failures, measure frequency with bounded repetition in isolation. For performance, measure a baseline before editing.
5. If no useful check is possible, report attempts and request the missing sanitized evidence. Untested explanations remain hypotheses.

## Test and fix

- Give each hypothesis a predicted observable result. Test one variable at a time; change hypotheses when evidence contradicts them.
- Prefer targeted inspection over broad logging. Mark temporary diagnostics clearly. Never put secrets into logs or fixtures.
- Obtain explicit approval for production instrumentation or disruptive experiments. Preserve user work and stay within authorized edit scope.
- Trace all relevant callers before fixing the shared cause. Make the reproduction a regression check of the real failure, and observe it fail before the fix.
- Apply the smallest fix. Run the regression check and original scenario. If no meaningful test boundary exists, report the gap rather than add a shallow test.
- Remove only diagnostics you introduced, or retain useful ones in a clearly identified local location.

Report cause or remaining hypothesis, changed files, checks actually run, results, and gaps. Do not expand into architectural changes without approval.
