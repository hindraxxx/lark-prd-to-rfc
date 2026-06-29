# AGENTS.md

This repo is a CLI-first workflow for turning a Lark PRD into local Markdown artifacts, Lark-ready XML, and local HTML previews.

## Primary User Flow

Keep these commands working:

```bash
prd_to_rfc "<lark-prd-url>" <session-name>
regenerate_rfc <session-name>
```

Where `<session-name>` maps to:

```text
output/<session-name>/
```

Expected artifacts:

```text
output/<session-name>/prd.md
output/<session-name>/rfc.md
output/<session-name>/tasks.md
output/<session-name>/rfc.lark.md
output/<session-name>/rfc.lark.xml
output/<session-name>/rfc.lark.html
output/<session-name>/lark-rfc.json
```

## Rules For Changes

- Always update the latest workflow documentation when changing CLI behavior.
- Keep `run.sh`, `regenerate.sh`, `install.sh`, `README.md`, and this file consistent.
- Keep global command names stable:
  - `prd_to_rfc`
  - `regenerate_rfc`
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
bash ./regenerate.sh agent-test
bash ./install.sh
prd_to_rfc --help
regenerate_rfc --help
test -f .agents/skills/prd-to-rfc/SKILL.md
```

If Lark CLI or `PRD_TO_RFC_FETCH_CMD` is not configured, URL-based `run.sh` must fail loudly.

## Implementation Notes

- `run.sh` is the main orchestration wrapper.
- `regenerate.sh` refreshes `rfc.lark.html` after manual edits to `rfc.lark.xml` (XML-primary).
- `src/cli.js` exposes lower-level commands.
- `src/path.js` maps simple session names to `./output/<session>`.
- `src/markdown.js` owns Markdown to Lark-friendly conversion:
  - `rfc.md` is a portable Markdown mirror for GitHub rendering; generated once at `generate` time and not the source of truth after edits.
  - `rfc.lark.md` is Lark-ready Markdown for reference; generated once at `generate` time.
  - `rfc.lark.xml` is the primary, editable RFC artifact and the reliable Lark import format (tables, code blocks, `<callout>`, `<checkbox>`, and `<whiteboard type="mermaid">` blocks). Edit this file after generation.
  - `rfc.lark.html` is a local browser preview only; regenerated from `rfc.lark.xml` by `regenerate_rfc`. Do not rely on manual browser copy/paste for Lark-specific blocks.
  - Push uses `rfc.lark.xml` (not `rfc.md` or browser-copied HTML) so tables and mermaid render natively in Lark.
- `.agents/skills/prd-to-rfc/SKILL.md` is the repo-local skill OpenCode should read.
