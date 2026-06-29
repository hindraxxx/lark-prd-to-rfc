---
name: prd-to-rfc
description: Convert a Lark PRD into local PRD/RFC/task Markdown artifacts, regenerate Lark-ready XML/HTML after edits, and optionally push the RFC through a configured Lark CLI command.
allowed-tools: Bash, Read, Write, Edit
---

# PRD to RFC Skill

Use this skill when converting a Lark PRD or exported PRD text into reviewable Markdown artifacts:

1. normalized PRD Markdown,
2. RFC Markdown,
3. engineering task breakdown.

## Workflow

1. Pull the source.
   - If the input is a Lark URL, invoke `prd_to_rfc <url> <session-name>`.
   - If the user gives a change area, pass it as `--scope`, for example `--scope "Backend, Frontend"`.
   - If the user gives repository ownership or implementation hints, save them in a small Markdown context file and pass it as `--context <context.md>`.
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

4. Create `rfc.md`.
   - Use `templates/rfc.md`.
   - Convert product requirements into engineering implications.
   - Use the requested scope to focus the RFC on backend, frontend, QA, data/analytics, release, or any other named implementation area.
   - When the user provides repositories to analyze, inspect those repositories before finalizing the RFC and fill the Repository Analysis table with file-backed conclusions.
   - Include a Mermaid diagram in the System Design section using a standard ` ```mermaid ` fenced code block. The harness auto-converts this to a Lark `<whiteboard type="mermaid">` block in `rfc.lark.xml` for native rendering. Prefer a flowchart or sequence diagram that reflects the actual repository boundaries and data/control flow.
   - Include non-goals, API changes, data model changes, edge cases, observability, rollout, risks, and open questions.
   - Include the implementation task checklist at the bottom of the RFC so reviewers can see the work breakdown without opening `tasks.md`.

5. Create `tasks.md`.
   - Use `templates/tasks.md`.
   - Group tasks by backend, frontend, QA, data/analytics, release, and decisions needed.
   - Each task should include acceptance criteria.

6. Push back to Lark only after the Markdown is reviewable.
   - Push uses `rfc.lark.xml` (Lark XML with tables and `<whiteboard type="mermaid">` blocks) with `lark-cli docs +create --doc-format xml` by default.
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
  -> agent improves rfc.md/tasks.md if needed
  -> agent runs regenerate_rfc <session-name>
  -> agent reruns push if needed
  -> agent reports Lark RFC URL from push output
```

After editing `rfc.md`, regenerate the Lark-ready XML, Markdown, and HTML preview:

```bash
regenerate_rfc "<session-name>"
```

## Quality Bar

- Do not invent requirements.
- Distinguish facts, assumptions, and questions.
- Prefer clear TODO markers over fake certainty.
- Keep generated tasks implementable and testable.
- When Lark CLI access fails, leave any existing local Markdown artifacts intact and report the exact blocked step.
