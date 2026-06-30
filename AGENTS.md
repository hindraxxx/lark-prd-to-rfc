# AGENTS.md

This repo is a CLI-first workflow for turning a Lark PRD into local Markdown artifacts and Lark-ready XML.

## Primary User Flow

Keep these commands working:

```bash
prd_to_rfc "<lark-prd-url>" <session-name>
```

Where `<session-name>` maps to:

```text
output/<session-name>/
```

Expected artifacts:

```text
output/<session-name>/prd.md
output/<session-name>/tasks.md
output/<session-name>/rfc.lark.xml
output/<session-name>/lark-rfc.json
```

## Read-Only Intent Guardrail

- Treat requests to "check", "inspect", "review", "analyze", "gather info from", "look at", or "understand" a repo/path as read-only by default.
- If the user references another repo/path and the requested outcome is ambiguous, gather information and report findings instead of editing or generating code.
- Do not make repository changes unless the user explicitly asks to implement, edit, generate, commit, or otherwise modify files.
- If wording could plausibly mean either "make changes in this repo" or "gather information from that repo", ask a short clarification question before touching files.

## Rules For Changes

- Always update the latest workflow documentation when changing CLI behavior.
- Keep `run.sh`, `install.sh`, `README.md`, and this file consistent.
- Keep global command names stable:
  - `prd_to_rfc`
- Keep the repository-local OpenCode skill under:
  - `.agents/skills/prd-to-rfc/SKILL.md`
- Keep `opencode.json` pointing to `.agents/skills` so OpenCode can discover repo-local skills.
- Do not require MCP.
- Require Lark CLI for URL-based PRD pulls. Do not generate placeholder PRDs from URLs.
- First Lark RFC push should create `lark-rfc.json`; later pushes should update the saved doc, not create duplicates.
- Do not bake credentials into the repo.
- Use env-configured command hooks for Lark integration:
  - `LARK_CLI_BIN`
  - `PRD_TO_RFC_FETCH_CMD`
  - `PRD_TO_RFC_PUSH_CMD`
  - `RFC_TITLE`
- Generated artifacts under `output/` are ignored and should not be committed.

## Verification

After behavior changes, run:

```bash
npm run check
bash ./run.sh "https://example.larksuite.com/docx/demoToken123" agent-test
bash ./install.sh
prd_to_rfc --help
test -f .agents/skills/prd-to-rfc/SKILL.md
```

If Lark CLI or `PRD_TO_RFC_FETCH_CMD` is not configured, URL-based `run.sh` must fail loudly.

## Implementation Notes

- `run.sh` is the main orchestration wrapper.
- `src/cli.js` exposes lower-level commands.
- `src/path.js` maps simple session names to `./output/<session>`.
- `src/markdown.js` owns Markdown to Lark-friendly conversion:
  - `rfc.lark.xml` is the primary, editable RFC artifact and the reliable Lark import format (tables, code blocks, `<callout>`, `<checkbox>`, and `<whiteboard type="mermaid">` blocks). Edit this file after generation.
  - Push uses `rfc.lark.xml` so tables and mermaid render natively in Lark.
- `.agents/skills/prd-to-rfc/SKILL.md` is the repo-local skill OpenCode should read.
- Generated RFCs must include an Implementation Direction Confirmation checkpoint. Before finalizing or pushing, the agent must discuss any agent-inferred API strategy, service ownership/source-of-truth, sync/async linking, cache strategy, experiment/whitelist rollout, backfill/migration, or retry/idempotency behavior with the user, or leave it as an explicit TODO/Open Question.
