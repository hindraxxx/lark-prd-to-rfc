#!/usr/bin/env node
import { generateArtifacts, generateLarkHtml, pullPrd, pushRfc } from "./pipeline.js";
import { parseLarkUrl } from "./lark-url.js";

const args = process.argv.slice(2);
const command = args[0];

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

async function main() {
  if (!command || command === "help" || command === "--help") {
    printHelp();
    return;
  }

  if (command === "parse-url") {
    const url = valueOf("--url") ?? args[1];
    if (!url) throw new Error("Usage: prd-to-rfc parse-url --url <lark-url>");
    console.log(JSON.stringify(parseLarkUrl(url), null, 2));
    return;
  }

  if (command === "generate") {
    const result = await generateArtifacts({
      url: valueOf("--url"),
      fromFile: valueOf("--from-file"),
      outDir: valueOf("--out-dir") ?? "./output",
      scope: valueOf("--scope"),
      contextFile: valueOf("--context")
    });

    console.log("Generated artifacts:");
    console.log(`- PRD: ${result.prdPath}`);
    console.log(`- RFC: ${result.rfcPath}`);
    console.log(`- Tasks: ${result.tasksPath}`);
    console.log(`- Lark HTML: ${result.larkHtmlPath}`);

    if (result.source.label.startsWith("http")) {
      console.log("");
      console.log("URL mode creates a placeholder unless you use `pull` with PRD_TO_RFC_FETCH_CMD first.");
    }
    return;
  }

  if (command === "pull") {
    const result = await pullPrd({
      url: valueOf("--url"),
      outDir: valueOf("--out-dir") ?? "./output"
    });

    console.log("Pulled PRD:");
    console.log(`- PRD: ${result.prdPath}`);
    console.log(`- Parsed URL: ${JSON.stringify(result.parsed)}`);
    return;
  }

  if (command === "html") {
    const result = await generateLarkHtml({
      rfcFile: valueOf("--rfc-file"),
      outFile: valueOf("--out-file")
    });

    console.log("Generated Lark HTML:");
    console.log(`- Lark HTML: ${result.htmlPath}`);
    return;
  }

  if (command === "push") {
    const result = await pushRfc({
      htmlFile: valueOf("--html-file"),
      rfcFile: valueOf("--rfc-file"),
      stateFile: valueOf("--state-file"),
      title: valueOf("--title"),
      parent: valueOf("--parent")
    });

    console.log(result || "Pushed RFC to Lark.");
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

function valueOf(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function printHelp() {
  console.log(`prd-to-rfc

Commands:
  pull --url <lark-url> --out-dir <dir>
  generate --from-file <path> --out-dir <dir>
  generate --url <lark-url> --out-dir <dir>
    [--scope <Backend|Frontend|QA|Data|Release|...>] [--context <context.md>]
  html --rfc-file <path> [--out-file <path>]
  push --html-file <path> [--rfc-file <path>] [--state-file <path>] --title <title> [--parent <lark-folder-or-doc>]
  parse-url --url <lark-url>

Examples:
  PRD_TO_RFC_FETCH_CMD='lark-cli docs +fetch --doc "{{url}}" --doc-format markdown --jq ".data.document.content"' node ./src/cli.js pull --url "https://example.larksuite.com/docx/xxxx" --out-dir ./output/my-prd
  node ./src/cli.js generate --from-file ./examples/sample-prd.md --out-dir ./output/demo --scope "Backend, Frontend" --context ./context.md
  node ./src/cli.js html --rfc-file ./output/demo/rfc.md --out-file ./output/demo/rfc.lark.html
  PRD_TO_RFC_PUSH_CMD='lark-cli docs +create --doc-format markdown --title "{{title}}" --content @{{rfc_file}}' node ./src/cli.js push --html-file ./output/demo/rfc.lark.html --rfc-file ./output/demo/rfc.md --title "RFC: Demo"
  node ./src/cli.js parse-url --url "https://example.larksuite.com/docx/xxxx"
`);
}
