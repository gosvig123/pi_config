---
name: github-issues
description: "Draft or review issue text from supplied content and local repository evidence. Use for bug reports, feature requests, engineering tasks, comments, or proposed issue edits; no remote search or mutation is performed."
---

# Issue Drafts

## Authority

This is a local drafting workflow. Draft, review, prepare, and help with are read-only. Do not create, update, comment on, close, reopen, assign, or label remote issues. Describe requested remote changes as proposals only. Save local Markdown only with explicit approval of path and content.

Never include secrets, credentials, private logs, or personal data. For an unpatched vulnerability, stop public drafting and ask for an approved private disclosure route; do not disclose it remotely.

## Prepare

1. Read available project-local issue templates, contribution guidance, and security policy. Read supplied issue bodies, comments, and evidence; do not fetch missing references.
2. Check supplied or locally stored open and closed issues for likely duplicates. State the coverage limit: no remote duplicate search occurred. A separate issue may be intentional.
3. Separate facts from assumptions. Do not invent motivation, reproduction, impact, versions, or acceptance criteria. Ask for gaps that affect correctness or scope.
4. Write a searchable title and focused body using an existing local template or the inline shape below. Omit irrelevant sections and split unrelated work.

## Body shapes

- **Bug:** observed failure and impact; minimal reproduction; expected and actual results; sanitized evidence and known version.
- **Feature:** problem; desired outcome; included and excluded scope; verifiable acceptance criteria.
- **Engineering task:** context; specific outcome; acceptance criteria; real migration or operational risks.

For an edit, preserve unrelated body sections and show the proposed before-and-after delta. Keep a comment separate from body edits. State changes and metadata remain proposals; do not add them as side effects. Identify related supplied issues by local identifier without copying their bodies.

Report proposed action and target, draft content or delta, known duplicates and search limits, missing evidence, and local save status. Never claim remote success.
