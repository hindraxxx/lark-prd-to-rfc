# PRD to RFC

Agent workflow for turning a Lark PRD into a repository-backed RFC.

## 1. Ask Your Agent To Install This Repo

Prompt your coding agent from this repository:

```text
Install this repo for PRD to RFC usage.
Keep the prd_to_rfc command available globally, and make sure the repo-local prd-to-rfc skill can be discovered.
```

The agent should run:

```bash
./install.sh
```

This installs the global command:

```text
prd_to_rfc
```

The repo-local skill is here:

```text
.agents/skills/prd-to-rfc/SKILL.md
```

## 2. Finish Local Lark Setup

After install, run:

```bash
./install.sh
lark-cli login
```

If your Lark CLI binary uses another name or path, set:

```bash
export LARK_CLI_BIN=/path/to/lark-cli
```

The Lark CLI login must have permission to read the PRD and create/update the RFC document.

### Required Lark Scopes

Lark uses granular, incrementally-accumulated scopes — each `lark-cli auth login --scope "..."` only grants what you name, so request them explicitly. The scopes below are needed for this workflow:

| Operation | Scope |
|-----------|-------|
| Read PRD / RFC document content | `docx:document:readonly` |
| Create / update RFC document | `docx:document:write_only`, `docx:document:create` |
| Download / upload document media | `docs:document.media:download`, `docs:document.media:upload` |
| Read document comments | `docs:document.comment:read` |
| Add / reply / resolve / delete comments | `docs:document.comment:create`, `docs:document.comment:write_only`, `drive:drive.metadata:readonly` |

Authorize in one go (scopes accumulate):

```bash
lark-cli auth login --scope "docx:document:readonly docx:document:write_only docx:document:create docs:document.media:download docs:document.media:upload docs:document.comment:read docs:document.comment:create docs:document.comment:write_only drive:drive.metadata:readonly"
```

Comment read and comment write are separate scopes — granting read does not grant resolve/delete, and vice versa.

## 3. Trigger The Workflow

Send your agent a prompt like this:

```text
Use prd-to-rfc for this PRD:
https://gotocompany.sg.larksuite.com/docx/KLxndxHSdoV5NbxbrntlWoMogGe
Session name: Default Payment Method
Scope: Backend, but only handle the credit application flow, post-credit flow and setting page, excluding transaction
Context:
- User Repo : ~/project/paylater-user-service/ should own the user setting default payment / not by doing API call to gopay
- BFF: ~/project/gpl-bff handle the entry point for /setting API
- Lending Adapter: ~/project/lending-adapter/ handle the API callback for successful credit application
Please generate the RFC, inspect those repos, fill Repository Analysis with file-backed findings, include a Mermaid diagram, and put implementation tasks at the bottom of the RFC.
```

Another sample prompt:

```text
Use prd-to-rfc for this PRD:
https://gotocompany.sg.larksuite.com/wiki/XIPawZ3hAir175kM6YYltsW7gLf
Feature: Digisign 4W - Spouse Signing
Session name: 4W Spouse
Scope: Backend only
Context:
- Gather the requirement and changes from this repository: /Users/liem.sanjaya/gtf/gpl/vehicle-finance-api-provider
- For the approach, reuse the existing API /v1/loans/latest to get the information for spouse.
Please generate the RFC, inspect the repository, fold file-backed findings into Current State, Solution, and Technical Approach, include per-story Mermaid sequence diagrams, and put implementation tasks at the bottom of the RFC.
```

The workflow writes generated artifacts under:

```text
output/<session-name>/
```

Expected files:

```text
output/<session-name>/prd.md
output/<session-name>/tasks.md
output/<session-name>/rfc.lark.xml
output/<session-name>/lark-rfc.json
```

`rfc.lark.xml` is the primary editable RFC artifact. The first push creates `lark-rfc.json`; later pushes update the saved RFC document instead of creating duplicates.
