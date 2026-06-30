# PRD to RFC

Lark-CLI-first workflow for turning a Lark PRD into:

1. a normalized PRD Markdown file,
2. an RFC XML artifact with per-story Mermaid sequence diagrams and an implementation task checklist,
3. a task breakdown Markdown file,
4. and a pushed Lark RFC document through Lark CLI command hooks.

## Current Shape

This repo is built for your agent-driven daily flow. The agent invokes this CLI for Lark I/O and artifact conversion, then uses its own reasoning to review and improve the generated RFC.

```text
You
  -> talk to agent
  -> provide repositories to inspect when the RFC depends on existing code
  -> agent invokes CLI pull
  -> CLI gets PRD from Lark
  -> agent/CLI creates prd.md, rfc.lark.xml (primary), tasks.md
  -> agent improves rfc.lark.xml with repository-backed analysis, Mermaid diagrams, and tasks
  -> CLI pushes XML into a new Lark RFC doc
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

This installs a symlink into `~/.local/bin` by default:

```text
prd_to_rfc
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
prd_to_rfc <lark-prd-url> [session-name] [--scope <area>]
```

The session name can be any product/session name. `demo` maps to `output/demo/`. If you omit it, the script uses the Lark doc token.

When the RFC requires codebase context, give the agent the repository list before final review. The base RFC template (sourced from the canonical Lark RFC template) includes a metadata table, Glossary, Background, Current State, Desired State, Implementation Direction Confirmation, Solution, User Story with Acceptance Criteria, a single Technical Approach (multi-approach is optional, only when there are real alternatives), Cross-Cutting Checklist, Rollout/Rollback Plans, and review-meeting notes. Each User Story carries its own `<whiteboard type="mermaid">` sequence diagram; there is no separate System Design section, and no Repository Analysis / Implementation Context section. Codebase findings are folded into Current State, Solution, and the per-story Technical Approach, but Current State should read as today's end-to-end flow first and Solution should read as the overall design picture first. Keep detailed `file:line` references in compact evidence or story-level sections so implementation proof supports the narrative instead of replacing it. New or changed APIs must include request, response, error, and idempotency contracts, not just endpoint names. `rfc.lark.xml` is the primary editable artifact.

Before the agent finalizes or pushes an RFC, it must discuss any implementation direction that is not explicit in the PRD, prompt, or repository evidence. The generated RFC includes an Implementation Direction Confirmation table for API strategy, service ownership, sync/async linking, cache strategy, experiment/whitelist rollout, migration/backfill, and failure/retry behavior. Unanswered items should stay as TODO/Open Question rather than being presented as decided implementation.

Use `--scope` to tell the RFC which implementation area to emphasize:

```bash
prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name --scope "Backend"
prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name --scope "Backend, Frontend, QA"
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

After manually editing `rfc.lark.xml` (the primary artifact), push the refreshed RFC to Lark:

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
  --scope "Backend, Frontend"
```

Push the generated RFC XML back to Lark:

```bash
PRD_TO_RFC_PUSH_CMD='lark-cli docs +create --doc-format xml --title "{{title}}" --content @{{rfc_file}}' \
  node ./src/cli.js push \
  --rfc-file ./output/my-prd/rfc.lark.xml \
  --title "RFC: My Feature"
```

Standard commands:

```bash
lark-cli docs +fetch --doc "<url>" --doc-format markdown --jq ".data.document.content"
lark-cli docs +create --doc-format xml --title "<title>" --content @output/<session>/rfc.lark.xml
lark-cli docs +update --doc "<saved-rfc-url>" --command overwrite --doc-format xml --content @output/<session>/rfc.lark.xml
```

Override hooks remain available:

- `PRD_TO_RFC_FETCH_CMD` must print PRD content to stdout.
- `PRD_TO_RFC_PUSH_CMD` must create/update a Lark document. For `lark-cli`, use `{{rfc_file}}` with `--doc-format xml`.
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
