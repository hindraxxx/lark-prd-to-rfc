import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parseLarkUrl } from "./lark-url.js";
import { ensurePrdMarkdown, markdownToLarkMarkdown, markdownToLarkXml, renderFromTemplate, titleFromMarkdown, wrapXmlInHtml } from "./markdown.js";
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
  const scope = options.scope ?? "TODO: Backend, Frontend, QA, Data / Analytics, Release, or another explicit area.";

  const rfcXmlTemplate = await readFile(new URL("../templates/rfc.lark.xml", import.meta.url), "utf8");
  const rfcMdTemplate = await readFile(new URL("../templates/rfc.md", import.meta.url), "utf8");
  const tasksTemplate = await readFile(new URL("../templates/tasks.md", import.meta.url), "utf8");

  const prdXml = markdownToLarkXml(prdMarkdown);

  const rfcXml = renderFromTemplate(rfcXmlTemplate, {
    title,
    source: source.label,
    prd: prdXml,
    scope
  });

  const rfcMarkdown = renderFromTemplate(rfcMdTemplate, {
    title,
    source: source.label,
    prd: prdMarkdown,
    scope
  });

  const tasksMarkdown = renderFromTemplate(tasksTemplate, {
    title,
    source: source.label,
    scope
  });

  const prdPath = join(options.outDir, "prd.md");
  const rfcPath = join(options.outDir, "rfc.md");
  const tasksPath = join(options.outDir, "tasks.md");
  const larkMdPath = join(options.outDir, "rfc.lark.md");
  const larkXmlPath = join(options.outDir, "rfc.lark.xml");
  const larkHtmlPath = join(options.outDir, "rfc.lark.html");
  const larkMd = markdownToLarkMarkdown(rfcMarkdown);
  const larkHtml = wrapXmlInHtml(rfcXml);

  await writeFile(prdPath, prdMarkdown + "\n", "utf8");
  await writeFile(rfcPath, rfcMarkdown + "\n", "utf8");
  await writeFile(tasksPath, tasksMarkdown + "\n", "utf8");
  await writeFile(larkMdPath, larkMd + "\n", "utf8");
  await writeFile(larkXmlPath, rfcXml + "\n", "utf8");
  await writeFile(larkHtmlPath, larkHtml + "\n", "utf8");

  return { prdPath, rfcPath, tasksPath, larkMdPath, larkXmlPath, larkHtmlPath, source };
}

export async function generateLarkHtml(options) {
  if (!options.xmlFile) throw new Error("Provide --xml-file for html.");

  const xml = await readFile(options.xmlFile, "utf8");
  const htmlPath = options.outFile ?? options.xmlFile.replace(/\.lark\.xml$/i, ".lark.html");
  const html = wrapXmlInHtml(xml);

  await writeFile(htmlPath, html + "\n", "utf8");

  return { htmlPath };
}

export async function pushRfc(options) {
  if (!options.htmlFile) throw new Error("Provide --html-file for push.");
  let rfcFile = options.rfcFile ?? options.htmlFile.replace(/\.lark\.html$/i, ".md");
  const larkMdCandidate = rfcFile.replace(/\.md$/i, ".lark.md");
  if (!options.rfcFile) {
    try {
      await readFile(larkMdCandidate, "utf8");
      rfcFile = larkMdCandidate;
    } catch {
      // rfc.lark.md not found; fall back to rfc.md
    }
  }
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
