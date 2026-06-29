#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  prd_to_rfc <lark-prd-url> [session-name]
  prd_to_rfc --from-file <prd.md> [session-name]
  prd_to_rfc --html <out-dir-or-rfc.md>
  prd_to_rfc --push <out-dir-or-html-file>

Optional env:
  LARK_CLI_BIN          Lark CLI binary name/path; auto-detects lark-cli then lark
  PRD_TO_RFC_FETCH_CMD  override command that prints PRD markdown/text/html to stdout
  PRD_TO_RFC_PUSH_CMD   override command that creates a Lark doc
  PRD_TO_RFC_SKIP_PUSH  set to 1 to only generate local artifacts
  RFC_TITLE             title to use when pushing RFC to Lark

Examples:
  prd_to_rfc "https://example.larksuite.com/docx/abc123" demo

  PRD_TO_RFC_SKIP_PUSH=1 prd_to_rfc "https://example.larksuite.com/docx/abc123" demo

  regenerate_rfc demo
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

if [[ "$input" == "--html" ]]; then
  if [[ $# -lt 2 ]]; then
    echo "Missing path after --html" >&2
    exit 1
  fi

  target="$2"
  if [[ -d "$target" ]]; then
    rfc_file="$target/rfc.md"
    html_file="$target/rfc.lark.html"
  else
    rfc_file="$target"
    html_file="${target%.md}.lark.html"
  fi

  node ./src/cli.js html --rfc-file "$rfc_file" --out-file "$html_file"
  echo ""
  echo "Regenerated Lark HTML:"
  echo "  $html_file"
  exit 0
fi

if [[ "$input" == "--push" ]]; then
  if [[ $# -lt 2 ]]; then
    echo "Missing path after --push" >&2
    exit 1
  fi

  target="$2"
  if [[ -d "$target" ]]; then
    html_file="$target/rfc.lark.html"
    rfc_file="$target/rfc.md"
    title="${RFC_TITLE:-RFC: $(basename "$target")}"
  else
    html_file="$target"
    rfc_file="${target%.lark.html}.md"
    title="${RFC_TITLE:-RFC: $(basename "${target%.*}")}"
  fi

  node ./src/cli.js push --html-file "$html_file" --rfc-file "$rfc_file" --title "$title"
  exit 0
fi

if [[ "$input" == "--from-file" ]]; then
  if [[ $# -lt 2 ]]; then
    echo "Missing file path after --from-file" >&2
    exit 1
  fi

  prd_file="$2"
  from_file_session="${3:-manual}"
  out_dir="$(node -e 'import("./src/path.js").then(({outputDirForSession}) => console.log(outputDirForSession(process.argv[1])))' "$from_file_session")"

  mkdir -p "$out_dir"
  node ./src/cli.js generate --from-file "$prd_file" --out-dir "$out_dir"
else
  url="$input"
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
  node ./src/cli.js generate --from-file "$out_dir/prd.md" --out-dir "$out_dir"
fi

if [[ "${PRD_TO_RFC_SKIP_PUSH:-}" == "1" ]]; then
  echo ""
  echo "Skipped Lark push because PRD_TO_RFC_SKIP_PUSH=1."
elif [[ -n "${PRD_TO_RFC_PUSH_CMD:-}" ]]; then
  title="${RFC_TITLE:-RFC: $(basename "$out_dir")}"
  node ./src/cli.js push --html-file "$out_dir/rfc.lark.html" --rfc-file "$out_dir/rfc.md" --title "$title"
else
  if ! lark_bin="$(resolve_lark_cli)"; then
    echo "Missing required Lark CLI for push. Expected lark-cli or lark on PATH." >&2
    exit 1
  fi
  export PRD_TO_RFC_PUSH_CMD="$lark_bin docs +create --doc-format markdown --title \"{{title}}\" --content @{{rfc_file}}"
  title="${RFC_TITLE:-RFC: $(basename "$out_dir")}"
  node ./src/cli.js push --html-file "$out_dir/rfc.lark.html" --rfc-file "$out_dir/rfc.md" --title "$title"
fi

echo ""
echo "Artifacts:"
echo "  $out_dir/prd.md"
echo "  $out_dir/rfc.md"
echo "  $out_dir/tasks.md"
echo "  $out_dir/rfc.lark.html"
