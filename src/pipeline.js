import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parseLarkUrl } from "./lark-url.js";
import { ensurePrdMarkdown, markdownToLarkHtml, renderFromTemplate, titleFromMarkdown } from "./markdown.js";
import { runConfiguredCommand } from "./shell.js";

export async function pullPrd(options) {
  if (!options.url) throw new Error("Provide --url for pull.");
  if (!process.env.PRD_TO_RFC_FETCH_CMD) {
    throw new Error("Set PRD_TO_RFC_FETCH_CMD, or use run.sh/prd_to_rfc so the standard lark-cli fetch command is applied.");
  }

  await mkdir(options.outDir, { recursive: true });
  const parsed = parseLarkUrl(options.url);
  const fetched = await runConfiguredCommand(process.env.PRD_TO_RFC_FETCH_CMD, {
    url: options.url,
    kind: parsed.kind,
    token: parsed.token,
    host: parsed.host
  });

  const prdMarkdown = ensurePrdMarkdown(fetched, options.url);
  const prdPath = join(options.outDir, "prd.md");
  await writeFile(prdPath, prdMarkdown + "\n", "utf8");

  return { prdPath, parsed };
}

export async function generateArtifacts(options) {
  await mkdir(options.outDir, { recursive: true });

  const source = await loadSource(options);
  const prdMarkdown = ensurePrdMarkdown(source.markdown, source.label);
  const title = titleFromMarkdown(prdMarkdown);
  const context = await loadContext(options.contextFile);
  const scope = options.scope ?? "TODO: Backend, Frontend, QA, Data / Analytics, Release, or another explicit area.";

  const rfcTemplate = await readFile(new URL("../templates/rfc.md", import.meta.url), "utf8");
  const tasksTemplate = await readFile(new URL("../templates/tasks.md", import.meta.url), "utf8");

  const rfcMarkdown = renderFromTemplate(rfcTemplate, {
    title,
    source: source.label,
    prd: prdMarkdown,
    scope,
    context
  });

  const tasksMarkdown = renderFromTemplate(tasksTemplate, {
    title,
    source: source.label,
    scope,
    context
  });

  const prdPath = join(options.outDir, "prd.md");
  const rfcPath = join(options.outDir, "rfc.md");
  const tasksPath = join(options.outDir, "tasks.md");
  const larkHtmlPath = join(options.outDir, "rfc.lark.html");
  const larkHtml = markdownToLarkHtml(rfcMarkdown);

  await writeFile(prdPath, prdMarkdown + "\n", "utf8");
  await writeFile(rfcPath, rfcMarkdown + "\n", "utf8");
  await writeFile(tasksPath, tasksMarkdown + "\n", "utf8");
  await writeFile(larkHtmlPath, larkHtml + "\n", "utf8");

  return { prdPath, rfcPath, tasksPath, larkHtmlPath, source };
}

export async function generateLarkHtml(options) {
  if (!options.rfcFile) throw new Error("Provide --rfc-file for html.");

  const rfcMarkdown = await readFile(options.rfcFile, "utf8");
  const htmlPath = options.outFile ?? options.rfcFile.replace(/\.md$/i, ".lark.html");
  const larkHtml = markdownToLarkHtml(rfcMarkdown);

  await writeFile(htmlPath, larkHtml + "\n", "utf8");

  return { htmlPath };
}

export async function pushRfc(options) {
  if (!options.htmlFile) throw new Error("Provide --html-file for push.");
  const rfcFile = options.rfcFile ?? options.htmlFile.replace(/\.lark\.html$/i, ".md");
  const stateFile = options.stateFile ?? join(dirname(rfcFile), "lark-rfc.json");
  const state = await readJsonIfExists(stateFile);
  const command = state?.documentUrl || state?.documentToken
    ? process.env.PRD_TO_RFC_UPDATE_CMD
    : process.env.PRD_TO_RFC_PUSH_CMD;

  if (!command) {
    throw new Error("Set PRD_TO_RFC_PUSH_CMD/PRD_TO_RFC_UPDATE_CMD, or use run.sh/prd_to_rfc so standard lark-cli commands are applied.");
  }

  const html = await readFile(options.htmlFile, "utf8");
  const result = await runConfiguredCommand(command, {
    html_file: options.htmlFile,
    rfc_file: rfcFile,
    doc: state?.documentUrl ?? state?.documentToken ?? "",
    title: options.title ?? "RFC Draft",
    parent: options.parent ?? "",
    html
  });

  const nextState = buildPushState({
    previous: state,
    result,
    stateFile,
    title: options.title ?? "RFC Draft",
    rfcFile,
    htmlFile: options.htmlFile
  });
  await writeFile(stateFile, JSON.stringify(nextState, null, 2) + "\n", "utf8");

  return result.trim();
}

async function readJsonIfExists(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
}

function buildPushState({ previous, result, stateFile, title, rfcFile, htmlFile }) {
  const parsed = tryParseJson(result);
  const document = parsed?.data?.document ?? {};

  return {
    title,
    documentUrl: document.url ?? previous?.documentUrl ?? "",
    documentToken: document.document_id ?? document.token ?? previous?.documentToken ?? "",
    lastPushedAt: new Date().toISOString(),
    lastResult: parsed ?? result,
    rfcFile,
    htmlFile,
    stateFile
  };
}

function tryParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

async function loadSource(options) {
  if (options.fromFile) {
    return {
      label: options.fromFile,
      markdown: await readFile(options.fromFile, "utf8")
    };
  }

  if (options.url) {
    throw new Error("Direct URL generation is disabled. Use `pull` with PRD_TO_RFC_FETCH_CMD, then generate from the pulled prd.md.");
  }

  throw new Error("Provide either --from-file or --url.");
}

async function loadContext(contextFile) {
  if (!contextFile) {
    return [
      "TODO: Add repository context before finalizing the RFC. Example:",
      "",
      "- Backend: `/path/to/repo-a` owns user APIs and user domain changes.",
      "- Frontend: `/path/to/repo-b` owns settings UI and user-facing copy.",
      "- Shared contracts: `/path/to/repo-c` owns generated API clients or schemas."
    ].join("\n");
  }

  return readFile(contextFile, "utf8");
}
