---
name: domain-modeling
description: "Build or refine project terminology, domain boundaries, and architecture decisions. Use when modeling a domain or editing context language; not for vocabulary lookup alone."
---

# Domain Modeling

1. Read project-local `CONTEXT-MAP.md` when present. It lists context names, local locations, purposes, and cross-context relationships. Otherwise read root `CONTEXT.md`. Ask when the relevant boundary is unclear.
2. Compare terms with code and existing language. Surface contradictions. Propose one precise canonical name for each concept.
3. Test relationships and edge cases with clearly labeled hypothetical scenarios. Do not record a hypothetical as established behavior.
4. Record only resolved, evidenced language within authorized write scope. Do not edit during read-only work. Create context files only when facts warrant them.

## Inline context format

Use a context-name title and a brief purpose. Under **Language**, give each bold canonical term a one-sentence definition and meaningful aliases to avoid. Under **Relationships**, state links between terms and cardinality only when evidenced. Under **Flagged ambiguities**, record conflicts as unresolved until evidence or user input settles them. Preserve existing format, merge duplicates, and omit empty sections. Optional dialogue must be an actual evidenced exchange.

Exclude implementation inventories, generic programming concepts, specifications, and scratch notes. Never infer business rules from names alone.

## Architecture Decision Records

An Architecture Decision Record (ADR) explains a consequential choice. Offer one only when the choice is costly to reverse, surprising without context, and has real alternatives with different costs or benefits.

Use the repository's format and agreed local location. Otherwise include **Context**, **Alternatives**, **Decision**, and **Consequences**. Mark proposals as proposed until approved. Create a record or directory only when needed and authorized. Report resolved terms, unresolved boundaries, and any proposed decision separately.
