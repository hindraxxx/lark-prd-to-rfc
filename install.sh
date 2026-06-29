#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "$0")" && pwd)"
bin_dir="${PRD_TO_RFC_BIN_DIR:-$HOME/.local/bin}"
source "$repo_dir/lib/lark-cli.sh"

if ! lark_bin="$(resolve_lark_cli)"; then
  echo "Missing required Lark CLI. Expected lark-cli or lark on PATH." >&2
  echo "Install/configure @larksuite/cli, or set LARK_CLI_BIN to the executable path." >&2
  exit 1
fi

mkdir -p "$bin_dir"
chmod +x "$repo_dir/run.sh" "$repo_dir/regenerate.sh"

ln -sf "$repo_dir/run.sh" "$bin_dir/prd_to_rfc"
ln -sf "$repo_dir/regenerate.sh" "$bin_dir/regenerate_rfc"

echo "Installed:"
echo "  $bin_dir/prd_to_rfc -> $repo_dir/run.sh"
echo "  $bin_dir/regenerate_rfc -> $repo_dir/regenerate.sh"
echo "  Lark CLI: $lark_bin"

case ":$PATH:" in
  *":$bin_dir:"*)
    ;;
  *)
    echo ""
    echo "Warning: $bin_dir is not on PATH in this shell."
    echo "Add this to your shell profile:"
    echo "  export PATH=\"$bin_dir:\$PATH\""
    ;;
esac

echo ""
echo "Try:"
echo "  prd_to_rfc --help"
echo "  regenerate_rfc --help"
