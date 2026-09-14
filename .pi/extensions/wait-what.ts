import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const RULES = `
WAIT-WHAT OUTPUT CONTRACT:
- Start with only the context needed to understand the answer.
- State the current position, then the next action or conclusion.
- Make the answer clear without rereading the conversation.
- Use short, active sentences and common words. Put one main idea in each sentence.
- Use exact domain terms from CONTEXT.md; follow CONTEXT-MAP.md when present.
- Define unfamiliar terms once.
`;

export default function waitWhat(pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event) => ({
		systemPrompt: `${event.systemPrompt}\n${RULES}`,
	}));
}
