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

Regenerates rfc.lark.html from the primary rfc.lark.xml.
Edit rfc.lark.xml (XML-primary), then run this to refresh the HTML preview.
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
xml_file="$out_dir/rfc.lark.xml"
html_file="$out_dir/rfc.lark.html"

if [[ ! -f "$xml_file" ]]; then
  echo "Missing RFC XML file: $xml_file" >&2
  echo "Run ./run.sh <lark-url> $session first, or create/edit $xml_file." >&2
  exit 1
fi

node ./src/cli.js html --xml-file "$xml_file" --out-file "$html_file"

echo ""
echo "Regenerated Lark HTML preview:"
echo "  $html_file"
