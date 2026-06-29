# PRD to RFC

Lark-CLI-first workflow for turning a Lark PRD into:

1. a normalized PRD Markdown file,
2. an RFC Markdown draft with repository analysis, a Mermaid system diagram, and an implementation task checklist,
3. a task breakdown Markdown file,
4. a Lark-friendly HTML artifact,
5. and a pushed Lark RFC document through Lark CLI command hooks.

## Current Shape

This repo is built for your agent-driven daily flow. The agent invokes this CLI for Lark I/O and artifact conversion, then uses its own reasoning to review and improve the generated RFC.

```text
You
  -> talk to agent
  -> provide repositories to inspect when the RFC depends on existing code
  -> agent invokes CLI pull
  -> CLI gets PRD from Lark
  -> agent/CLI creates prd.md, rfc.md, tasks.md
  -> agent improves rfc.md with repository-backed analysis, Mermaid design, and bottom-of-RFC tasks
  -> CLI converts rfc.md into rfc.lark.html
  -> CLI pushes HTML into a new Lark RFC doc
```

## Quick Demo

```bash
npm run demo
```

Outputs are written to:

```text
output/demo/
```

## Install Global Commands

```bash
./install.sh
```

`install.sh` requires the Lark CLI to be available as `lark-cli` or `lark`, or as `LARK_CLI_BIN`.

This installs symlinks into `~/.local/bin` by default:

```text
prd_to_rfc
regenerate_rfc
```

The repository-local agent skill lives at:

```text
.agents/skills/prd-to-rfc/SKILL.md
```

`opencode.json` points OpenCode at `.agents/skills`:

```json
{
  "skills": {
    "paths": [".agents/skills"]
  }
}
```

Override the bin directory with:

```bash
PRD_TO_RFC_BIN_DIR=/some/bin ./install.sh
```

## One Command Flow

The reusable executable is:

```bash
prd_to_rfc <lark-prd-url> [session-name] [--scope <area>] [--context <context.md>]
```

The session name can be any product/session name. `demo` maps to `output/demo/`. If you omit it, the script uses the Lark doc token.

When the RFC requires codebase context, give the agent the repository list before final review. The base RFC includes a Repository Analysis table, a Mermaid diagram placeholder in System Design, and an Implementation Tasks checklist at the bottom of `rfc.md`; the agent should replace those TODOs with conclusions from the inspected repositories.

Use `--scope` to tell the RFC which implementation area to emphasize:

```bash
prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name --scope "Backend"
prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name --scope "Backend, Frontend, QA"
```

Use `--context` when the change spans multiple repositories. A simple Markdown file is enough:

```markdown
# RFC Context

## Repositories

- Backend / user domain: `/path/to/repo-a`
  - Make user API, user model, permission, and persistence changes here.
  - Relevant areas: `src/users`, `src/auth`, `migrations`.
- Frontend / settings: `/path/to/repo-b`
  - Make settings UI, form validation, and copy changes here.
  - Relevant areas: `src/settings`, `src/routes/settings`.
- Shared contracts: `/path/to/repo-c`
  - Make API schema, generated client, and event contract changes here.

## Constraints

- Keep existing API behavior backward compatible.
- Do not change billing flows unless the PRD explicitly requires it.
```

Then run:

```bash
prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name \
  --scope "Backend, Frontend" \
  --context ./rfc-context.md
```

For local PRD files:

```bash
prd_to_rfc --from-file ./prd.md docs_name --scope "Frontend" --context ./rfc-context.md
```

URL-based runs use standard Lark CLI commands by default:

```bash
prd_to_rfc "https://example.larksuite.com/docx/abc123" demo
```

This fetches the PRD, generates local artifacts, and creates an RFC doc in Lark. To only generate local artifacts:

```bash
PRD_TO_RFC_SKIP_PUSH=1 prd_to_rfc "https://example.larksuite.com/docx/abc123" demo
```

Push behavior is stateful per session:

```text
output/demo/lark-rfc.json
```

If that file does not exist, push creates a new Lark document and saves its URL/token. If it exists, push updates the saved document instead of creating a duplicate.

From an existing local PRD file:

```bash
prd_to_rfc --from-file ./examples/sample-prd.md demo
```

After manually editing `rfc.md`, regenerate only the Lark HTML:

```bash
regenerate_rfc demo
```

Then push the refreshed RFC to Lark:

```bash
RFC_TITLE='RFC: Wallet Limit' \
  prd_to_rfc --push ./output/demo
```

## CLI Usage

From a local PRD Markdown file:

```bash
node ./src/cli.js generate --from-file ./examples/sample-prd.md --out-dir ./output/demo
```

From a Lark URL:

```bash
PRD_TO_RFC_FETCH_CMD='lark-cli docs +fetch --doc "{{url}}" --doc-format markdown --jq ".data.document.content"' \
  node ./src/cli.js pull \
  --url "https://example.larksuite.com/docx/xxxx" \
  --out-dir ./output/my-prd

node ./src/cli.js generate \
  --from-file ./output/my-prd/prd.md \
  --out-dir ./output/my-prd \
  --scope "Backend, Frontend" \
  --context ./rfc-context.md
```

Push the generated RFC Markdown back to Lark:

```bash
PRD_TO_RFC_PUSH_CMD='lark-cli docs +create --doc-format markdown --title "{{title}}" --content @output/my-prd/rfc.md' \
  node ./src/cli.js push \
  --html-file ./output/my-prd/rfc.lark.html \
  --rfc-file ./output/my-prd/rfc.md \
  --title "RFC: My Feature"
```

Standard commands:

```bash
lark-cli docs +fetch --doc "<url>" --doc-format markdown --jq ".data.document.content"
lark-cli docs +create --doc-format markdown --title "<title>" --content @output/<session>/rfc.md
lark-cli docs +update --doc "<saved-rfc-url>" --command overwrite --doc-format markdown --content @output/<session>/rfc.md
```

Override hooks remain available:

- `PRD_TO_RFC_FETCH_CMD` must print PRD content to stdout.
- `PRD_TO_RFC_PUSH_CMD` must create/update a Lark document. For `lark-cli`, use `{{rfc_file}}` with `--doc-format markdown`.
- `PRD_TO_RFC_UPDATE_CMD` can override updates to an existing saved RFC doc.
- `LARK_CLI_BIN` can override the required Lark CLI binary name/path; auto-detect checks `lark-cli` then `lark`.
- `PRD_TO_RFC_SKIP_PUSH=1` disables automatic Lark doc creation.

Available template variables for fetch:

```text
{{url}}
{{kind}}
{{token}}
{{host}}
```

Available template variables for push:

```text
{{html_file}}
{{rfc_file}}
{{doc}}
{{title}}
{{parent}}
```

## Local Skill

The local agent skill lives at:

```text
.agents/skills/prd-to-rfc/SKILL.md
```

Use it as the instruction source for Codex/OpenCode when you want the agent to convert a fetched PRD into reviewable Markdown artifacts.

## Lark Setup Notes

The URL alone is not enough. Lark CLI/auth setup still needs:

- Lark app ID,
- Lark app secret,
- doc read permission,
- doc create/write permission,
- task/Base permission if you later create tasks outside the RFC.

For wiki URLs, unwrap the wiki node first and fetch the underlying object token inside your Lark CLI/API fetch command.
