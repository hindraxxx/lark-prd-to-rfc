resolve_lark_cli() {
  if [[ -n "${LARK_CLI_BIN:-}" ]]; then
    command -v "$LARK_CLI_BIN"
    return
  fi

  if command -v lark-cli >/dev/null 2>&1; then
    command -v lark-cli
    return
  fi

  if command -v lark >/dev/null 2>&1; then
    command -v lark
    return
  fi

  return 1
}
