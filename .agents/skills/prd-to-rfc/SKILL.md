---
name: prd-to-rfc
description: Convert a Lark PRD into local PRD/RFC/task Markdown artifacts, regenerate Lark-ready XML/HTML after edits, and optionally push the RFC through a configured Lark CLI command.
allowed-tools: Bash, Read, Write, Edit
---

# PRD to RFC Skill

Use this skill when converting a Lark PRD or exported PRD text into reviewable Markdown artifacts:

1. normalized PRD Markdown,
2. RFC XML (Lark-ready),
3. engineering task breakdown.

## Workflow

1. Pull the source.
   - If the input is a Lark URL, invoke `prd_to_rfc <url> <session-name>`.
   - If the user gives a change area, pass it as `--scope`, for example `--scope "Backend, Frontend"`.
   - If the user gives repository ownership or implementation hints, read the context file and fold the details into Current State / Solution / per-story Technical Approach (there is no dedicated context section in the template).
   - Current State should explain the existing end-to-end product/system flow first. Use file references as supporting evidence, not as the structure of the section.
   - URL-based PRD pulls require Lark CLI.
   - The standard fetch command is built in; use `PRD_TO_RFC_FETCH_CMD` only to override it.
   - If the input is a file, use `prd_to_rfc --from-file <prd.md> <session-name>`.
   - Preserve source URL/file path in all outputs.

2. Normalize the PRD.
   - Keep product intent faithful.
   - Translate to English when needed.
   - Preserve original terms that may carry business meaning.
   - Mark ambiguity as `TODO` or `Open Question`; do not silently decide.

3. Create `prd.md`.
   - Use headings for background, goals, requirements, metrics, dependencies, and open questions.
   - Convert tables/checklists into Markdown.
   - Keep links as Markdown links.

4. Create `rfc.lark.xml` (primary) and `tasks.md`.
   - Use `templates/rfc.lark.xml` (Lark XML primary, retains `<callout>`, `<checkbox>`, `<whiteboard type="mermaid">`, tables).
   - `rfc.lark.xml` is the primary, editable RFC artifact. After generation, edit this file.
   - Convert product requirements into engineering implications.
   - Use the requested scope to focus the RFC on backend, frontend, QA, data/analytics, release, or any other named implementation area.
   - When the user provides repositories to analyze, inspect those repositories before finalizing the RFC. Fold codebase findings into **Current State**, **Solution**, and the per-story **Technical Approach**. Do **not** create a dedicated "Repository Analysis" or "Implementation Context" section — the template no longer has one.
   - **Current State structure:** start with a reader-friendly "Current Flow" narrative across services and data boundaries. Then list "Current Gaps / Constraints". Put `file:line` citations in a compact "Evidence" table, grouped by service/area. Avoid long bullets whose main content is paths, line ranges, search queries, or repository layout.
   - **Solution structure:** explain the overall system picture first: ownership, request/data flow, state transitions, synchronous vs asynchronous boundaries, failure handling, and what is intentionally out of path. Use code references sparingly in Solution; detailed citations belong in Current State / Evidence or story-level Technical Approach.
   - Leave Authors, Reviewers, and Approvers as highlighted TODO placeholders for the requester to fill manually. Do not infer or copy PRD authors, PRD stakeholders, PM names, repo owners, or the current agent/user into those fields unless the requester explicitly asks.
   - Before finalizing or pushing, re-check the top metadata table. If Authors, Reviewers, or Approvers contain real names, reset them to the highlighted manual TODO placeholders.
   - **API contract requirement:** do not list new endpoints as bullets only. For every new or changed API, include owner/caller, method/path, auth boundary, request schema, success response schema, error semantics, idempotency behavior, timeout/retry expectations, and compatibility notes. Put request, success response, and error response examples in code blocks instead of tables. If any part is not confirmed, mark it as TODO/Open Question instead of silently omitting it.
   - Each **User Story** includes its own `<whiteboard type="mermaid">` sequence diagram describing that story's control flow across the real repository boundaries. Do not put one big diagram in a separate System Design section (that section was removed).
   - The **Technical Approach** defaults to a single approach. Only add an "Approach #2" block when there is a genuine alternative solution to weigh; otherwise keep one approach and delete the callout/note about alternatives.
   - Include non-goals, API changes, data model changes, edge cases, observability, rollout, risks, and open questions.
   - Include the implementation task checklist at the bottom of the RFC so reviewers can see the work breakdown without opening `tasks.md`.

   **Implementation direction discussion gate:**
   - Before finalizing or pushing the RFC, stop and discuss any implementation direction that is not explicit in the PRD, user prompt, or repository evidence.
   - Do not assume a new API, new table, new cache, or new async/event flow just because it is technically plausible.
   - Ask the requester to confirm the smallest set of decisions needed to make the RFC implementable, especially:
     - whether to reuse/piggyback an existing API, extend an existing API, or create a new API;
     - which service owns each state change and which service must not be called directly;
     - whether linking/state updates are synchronous, asynchronous, callback-driven, event-driven, or reconciled later;
     - cache need, key/value shape, TTL, invalidation trigger, fallback, and observability;
     - experiment/whitelist owner, targeting rule, rollout phases, default state, monitoring gate, and kill switch;
     - backfill/migration policy;
     - timeout, retry, idempotency, duplicate callback, and partial-success behavior.
   - Record confirmed answers in **Implementation Direction Confirmation**, **Solution**, the relevant User Story **Technical Approach**, and **Rollout Plan**.
   - If the requester has not answered yet, keep the item as an explicit TODO/Open Question and do not present the implementation direction as decided.

5. Create `tasks.md`.
   - Use `templates/tasks.md`.
   - Group tasks by backend, frontend, QA, data/analytics, release, and decisions needed.
   - Each task should include acceptance criteria.

6. Push back to Lark only after the XML is reviewable.
   - Do not push while core implementation direction is still agent-inferred. Either get requester confirmation first or mark the unresolved points clearly as TODO/Open Question in the XML.
   - Push uses `rfc.lark.xml` with `lark-cli docs +create --doc-format xml` by default.
   - First push creates `output/<session>/lark-rfc.json` with the Lark RFC URL/token.
   - Later pushes update the saved RFC doc with `lark-cli docs +update --command overwrite`.
   - Use `PRD_TO_RFC_SKIP_PUSH=1` when the user only wants local artifacts.
   - Create a new Lark doc titled `RFC: <feature name>`.
   - Link back to the source PRD.
   - Preserve section structure.

## Expected Agent Flow

```text
User gives Lark PRD URL
  -> agent runs prd_to_rfc <url> <session-name>
  -> agent reviews prd.md
  -> agent improves rfc.lark.xml (primary) and tasks.md if needed
  -> agent runs prd_to_rfc --push <session-name> to push to Lark
  -> agent reports Lark RFC URL from push output
```

After editing `rfc.lark.xml` (the primary artifact), push directly — there is no separate HTML preview step.

## Quality Bar

- Do not invent requirements.
- Distinguish facts, assumptions, and questions.
- Prefer clear TODO markers over fake certainty.
- Keep generated tasks implementable and testable.
- When Lark CLI access fails, leave any existing local artifacts intact and report the exact blocked step.
