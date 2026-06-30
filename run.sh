#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  prd_to_rfc <lark-prd-url> [session-name] [--scope <area>]
  prd_to_rfc --from-file <prd.md> [session-name] [--scope <area>]
  prd_to_rfc --push <out-dir-or-rfc.lark.xml>

Optional env:
  LARK_CLI_BIN          Lark CLI binary name/path; auto-detects lark-cli then lark
  PRD_TO_RFC_FETCH_CMD  override command that prints PRD markdown/text/html to stdout
  PRD_TO_RFC_PUSH_CMD   override command that creates a Lark doc
  PRD_TO_RFC_SKIP_PUSH  set to 1 to only generate local artifacts
  RFC_TITLE             title to use when pushing RFC to Lark

Examples:
  prd_to_rfc "https://example.larksuite.com/docx/abc123" docs_name --scope "Backend, Frontend"

  PRD_TO_RFC_SKIP_PUSH=1 prd_to_rfc "https://example.larksuite.com/docx/abc123" demo

  prd_to_rfc --push ./output/demo
EOF
}

if [[ $# -lt 1 || "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

source_path="${BASH_SOURCE[0]}"
while [[ -L "$source_path" ]]; do
  source_dir="$(cd -P "$(dirname "$source_path")" && pwd)"
  source_path="$(readlink "$source_path")"
  [[ "$source_path" != /* ]] && source_path="$source_dir/$source_path"
done
cd "$(cd -P "$(dirname "$source_path")" && pwd)"
source ./lib/lark-cli.sh

input="$1"
session_name="${2:-}"
scope=""
context_file=""

if [[ "$input" == "--push" ]]; then
  if [[ $# -lt 2 ]]; then
    echo "Missing path after --push" >&2
    exit 1
  fi

  target="$2"
  if [[ -d "$target" ]]; then
    rfc_file="$target/rfc.lark.xml"
    state_file="$target/lark-rfc.json"
    title="${RFC_TITLE:-RFC: $(basename "$target")}"
  else
    rfc_file="$target"
    state_file="$(dirname "$target")/lark-rfc.json"
    title="${RFC_TITLE:-RFC: $(basename "${target%.*}")}"
  fi

  if [[ -z "${PRD_TO_RFC_PUSH_CMD:-}" || -z "${PRD_TO_RFC_UPDATE_CMD:-}" ]]; then
    if ! lark_bin="$(resolve_lark_cli)"; then
      echo "Missing required Lark CLI for push. Expected lark-cli or lark on PATH." >&2
      exit 1
    fi
    if [[ -z "${PRD_TO_RFC_PUSH_CMD:-}" ]]; then
      export PRD_TO_RFC_PUSH_CMD="$lark_bin docs +create --doc-format xml --title \"{{title}}\" --content @\"{{rfc_file}}\""
    fi
    if [[ -z "${PRD_TO_RFC_UPDATE_CMD:-}" ]]; then
      export PRD_TO_RFC_UPDATE_CMD="$lark_bin docs +update --doc \"{{doc}}\" --command overwrite --doc-format xml --content @\"{{rfc_file}}\""
    fi
  fi

  node ./src/cli.js push --rfc-file "$rfc_file" --state-file "$state_file" --title "$title"
  exit 0
fi

if [[ "$input" == "--from-file" ]]; then
  if [[ $# -lt 2 ]]; then
    echo "Missing file path after --from-file" >&2
    exit 1
  fi

  prd_file="$2"
  if [[ "${3:-}" == --* || $# -lt 3 ]]; then
    from_file_session="manual"
    parse_start=3
  else
    from_file_session="$3"
    parse_start=4
  fi
  while [[ $parse_start -le $# ]]; do
    arg="${!parse_start}"
    case "$arg" in
      --scope)
        parse_start=$((parse_start + 1))
        scope="${!parse_start:-}"
        ;;
      *)
        echo "Unknown option: $arg" >&2
        exit 1
        ;;
    esac
    parse_start=$((parse_start + 1))
  done
  out_dir="$(node -e 'import("./src/path.js").then(({outputDirForSession}) => console.log(outputDirForSession(process.argv[1])))' "$from_file_session")"

  mkdir -p "$out_dir"
  generate_args=(./src/cli.js generate --from-file "$prd_file" --out-dir "$out_dir")
  [[ -n "$scope" ]] && generate_args+=(--scope "$scope")
  node "${generate_args[@]}"
else
  url="$input"
  if [[ "${session_name:-}" == --* ]]; then
    session_name=""
    parse_start=2
  else
    parse_start=3
  fi
  while [[ $parse_start -le $# ]]; do
    arg="${!parse_start}"
    case "$arg" in
      --scope)
        parse_start=$((parse_start + 1))
        scope="${!parse_start:-}"
        ;;
      *)
        echo "Unknown option: $arg" >&2
        exit 1
        ;;
    esac
    parse_start=$((parse_start + 1))
  done
  if ! lark_bin="$(resolve_lark_cli)"; then
    echo "Missing required Lark CLI. Expected lark-cli or lark on PATH." >&2
    echo "Install/configure @larksuite/cli, or set LARK_CLI_BIN to the executable path." >&2
    exit 1
  fi
  if [[ -z "${PRD_TO_RFC_FETCH_CMD:-}" ]]; then
    export PRD_TO_RFC_FETCH_CMD="$lark_bin docs +fetch --doc \"{{url}}\" --doc-format markdown --jq \".data.document.content\""
  fi

  token="$(node ./src/cli.js parse-url --url "$url" | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{const x=JSON.parse(s); console.log(x.token || "lark-prd");})')"
  session="${session_name:-$token}"
  out_dir="$(node -e 'import("./src/path.js").then(({outputDirForSession}) => console.log(outputDirForSession(process.argv[1])))' "$session")"

  mkdir -p "$out_dir"

  node ./src/cli.js pull --url "$url" --out-dir "$out_dir"
  generate_args=(./src/cli.js generate --from-file "$out_dir/prd.md" --out-dir "$out_dir")
  [[ -n "$scope" ]] && generate_args+=(--scope "$scope")
  node "${generate_args[@]}"
fi

if [[ "${PRD_TO_RFC_SKIP_PUSH:-}" == "1" ]]; then
  echo ""
  echo "Skipped Lark push because PRD_TO_RFC_SKIP_PUSH=1."
elif [[ -n "${PRD_TO_RFC_PUSH_CMD:-}" ]]; then
  title="${RFC_TITLE:-RFC: $(basename "$out_dir")}"
  node ./src/cli.js push --rfc-file "$out_dir/rfc.lark.xml" --state-file "$out_dir/lark-rfc.json" --title "$title"
else
  if ! lark_bin="$(resolve_lark_cli)"; then
    echo "Missing required Lark CLI for push. Expected lark-cli or lark on PATH." >&2
    exit 1
  fi
  export PRD_TO_RFC_PUSH_CMD="$lark_bin docs +create --doc-format xml --title \"{{title}}\" --content @\"{{rfc_file}}\""
  export PRD_TO_RFC_UPDATE_CMD="$lark_bin docs +update --doc \"{{doc}}\" --command overwrite --doc-format xml --content @\"{{rfc_file}}\""
  title="${RFC_TITLE:-RFC: $(basename "$out_dir")}"
  node ./src/cli.js push --rfc-file "$out_dir/rfc.lark.xml" --state-file "$out_dir/lark-rfc.json" --title "$title"
fi

echo ""
echo "Artifacts:"
echo "  $out_dir/prd.md"
echo "  $out_dir/tasks.md"
echo "  $out_dir/rfc.lark.xml"
