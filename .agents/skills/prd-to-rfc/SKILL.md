---
name: prd-to-rfc
description: Convert a Lark PRD into local PRD/RFC/task Markdown artifacts, regenerate Lark-ready HTML after edits, and optionally push the RFC through a configured Lark CLI command.
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
   - Include non-goals, API changes, data model changes, edge cases, observability, rollout, risks, and open questions.

5. Create `tasks.md`.
   - Use `templates/tasks.md`.
   - Group tasks by backend, frontend, QA, data/analytics, release, and decisions needed.
   - Each task should include acceptance criteria.

6. Push back to Lark only after the Markdown is reviewable.
   - Push uses `rfc.md` with `lark-cli docs +create --doc-format markdown` by default.
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

After editing `rfc.md`, regenerate only the Lark HTML:

```bash
regenerate_rfc "<session-name>"
```

## Quality Bar

- Do not invent requirements.
- Distinguish facts, assumptions, and questions.
- Prefer clear TODO markers over fake certainty.
- Keep generated tasks implementable and testable.
- When Lark CLI access fails, leave any existing local Markdown artifacts intact and report the exact blocked step.
