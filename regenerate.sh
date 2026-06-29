#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  regenerate_rfc <session-name>
  regenerate_rfc <out-dir>

Examples:
  regenerate_rfc demo
  regenerate_rfc wallet-limit
  regenerate_rfc ./output/demo
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

session="$1"
out_dir="$(node -e 'import("./src/path.js").then(({outputDirForSession}) => console.log(outputDirForSession(process.argv[1])))' "$session")"
rfc_file="$out_dir/rfc.md"
html_file="$out_dir/rfc.lark.html"

if [[ ! -f "$rfc_file" ]]; then
  echo "Missing RFC file: $rfc_file" >&2
  echo "Run ./run.sh <lark-url> $session first, or create/edit $rfc_file." >&2
  exit 1
fi

node ./src/cli.js html --rfc-file "$rfc_file" --out-file "$html_file"

echo ""
echo "Regenerated Lark artifacts:"
echo "  $html_file"
echo "  ${html_file%.lark.html}.lark.md"
echo "  ${html_file%.lark.html}.lark.xml"
