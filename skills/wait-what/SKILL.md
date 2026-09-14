---
name: wait-what
description: "Re-explain the previous answer with the missing context and a clear next step. Use only when explicitly requested because the last explanation did not land."
disable-model-invocation: true
---

# Wait What

Use only when explicitly requested. Re-pitch the previous answer; do not resume operations or add new scope.

1. Start with only the context needed to understand the answer.
2. State the current position, then the next action or conclusion.
3. Use exact project terms from `CONTEXT.md` if available. If `CONTEXT-MAP.md` exists, use its list of local contexts and purposes to select the right vocabulary. Ask if that choice affects meaning; do not invent missing domain language.
4. Use short, active sentences and one idea per sentence. Define unfamiliar terms once. Keep facts, uncertainty, and pending decisions distinct.

Make the answer clear without requiring the user to reread the conversation. Preserve material risks and approval boundaries when simplifying.
