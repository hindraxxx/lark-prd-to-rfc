export function titleFromMarkdown(markdown, fallback = "Untitled PRD") {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

export function ensurePrdMarkdown(raw, sourceLabel) {
  const trimmed = raw.trim();
  const title = titleFromMarkdown(trimmed);

  if (trimmed.includes("## Goals") || trimmed.includes("## Requirements")) {
    return addSourceHeader(trimmed, sourceLabel);
  }

  return addSourceHeader(
    [
      `# ${title}`,
      "",
      "## Background",
      trimmed,
      "",
      "## Goals",
      "- TODO: Confirm product goals.",
      "",
      "## Requirements",
      "- TODO: Extract concrete requirements from source PRD.",
      "",
      "## Open Questions",
      "- TODO: Confirm ambiguous behavior with PM/design/engineering.",
      ""
    ].join("\n"),
    sourceLabel
  );
}

export function renderFromTemplate(template, values) {
  return Object.entries(values).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, String(value ?? "")),
    template
  );
}

const MERMAID_FENCE_RE = /```mermaid\s*\n([\s\S]*?)```/g;

export function markdownToLarkMarkdown(markdown) {
  return markdown.replace(
    MERMAID_FENCE_RE,
    (_match, code) => `<whiteboard type="mermaid">\n${code.trim()}\n</whiteboard>`
  );
}

export function markdownToLarkHtml(markdown) {
  const body = markdownToLarkXml(markdown);

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    "  <title>RFC</title>",
    "</head>",
    "<body>",
    body,
    "</body>",
    "</html>"
  ].join("\n");
}

export function markdownToLarkXml(markdown) {
  const larkMarkdown = markdownToLarkMarkdown(markdown);
  const lines = larkMarkdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCode = false;
  let codeBuffer = [];
  let codeLang = "";
  let inWhiteboard = false;
  let whiteboardBuffer = [];
  let tableBuffer = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  const closeTable = () => {
    if (tableBuffer.length) {
      html.push(renderTable(tableBuffer));
      tableBuffer = [];
    }
  };

  const flushCode = () => {
    const escaped = escapeHtml(codeBuffer.join("\n"));
    closeTable();
    if (codeLang === "mermaid") {
      html.push(`<whiteboard type="mermaid">\n${escaped}\n</whiteboard>`);
    } else {
      html.push(`<pre lang="${escapeHtml(codeLang || "text")}"><code>${escaped}</code></pre>`);
    }
    codeBuffer = [];
    inCode = false;
    codeLang = "";
  };

  for (const line of lines) {
    if (inWhiteboard) {
      if (line.includes("</whiteboard>")) {
        closeTable();
        html.push(`<whiteboard type="mermaid">\n${escapeHtml(whiteboardBuffer.join("\n"))}\n</whiteboard>`);
        whiteboardBuffer = [];
        inWhiteboard = false;
      } else {
        whiteboardBuffer.push(line);
      }
      continue;
    }

    if (line.startsWith("<whiteboard")) {
      closeList();
      closeTable();
      if (line.includes("</whiteboard>")) {
        html.push(line);
      } else {
        inWhiteboard = true;
      }
      continue;
    }

    if (line.startsWith("```")) {
      if (inCode) {
        flushCode();
      } else {
        closeList();
        closeTable();
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      closeTable();
      continue;
    }

    if (isTableLine(line)) {
      closeList();
      tableBuffer.push(line);
      continue;
    }

    closeTable();

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdownToHtml(heading[2])}</h${level}>`);
      continue;
    }

    const task = line.match(/^\s*-\s+\[( |x|X)\]\s+(.+)$/);
    if (task) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      const checked = task[1].toLowerCase() === "x" ? " checked" : "";
      html.push(`<li><input type="checkbox"${checked} disabled> ${inlineMarkdownToHtml(task[2])}</li>`);
      continue;
    }

    const bullet = line.match(/^\s*-\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdownToHtml(bullet[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdownToHtml(line)}</p>`);
  }

  closeList();
  closeTable();
  if (inCode) flushCode();

  return html.join("\n");
}

function addSourceHeader(markdown, sourceLabel) {
  if (!sourceLabel || markdown.includes("Source:")) return markdown;
  return markdown.replace(/^#\s+(.+)$/m, `# $1\n\nSource: ${sourceLabel}`);
}

function inlineMarkdownToHtml(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isTableLine(line) {
  if (!line.trim().startsWith("|") || !line.trim().endsWith("|")) return false;
  return splitTableRow(line).length > 1;
}

function isTableDivider(line) {
  return splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function renderTable(rows) {
  if (rows.length < 2 || !isTableDivider(rows[1])) {
    return rows.map((row) => `<p>${inlineMarkdownToHtml(row)}</p>`).join("\n");
  }

  const headers = splitTableRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitTableRow);
  const tableRows = [headers, ...bodyRows]
    .map((cells, index) => renderTableRow(cells, headers.length, index === 0))
    .join("\n");

  return [
    "<table>",
    renderColgroup(headers),
    `<tbody>${tableRows}</tbody>`,
    "</table>"
  ].join("\n");
}

function renderTableRow(cells, columnCount, isHeader) {
  const padded = [...cells];
  while (padded.length < columnCount) padded.push("");

  const renderedCells = padded
    .slice(0, columnCount)
    .map((cell) => {
      const content = inlineMarkdownToHtml(stripInlineCode(cell.trim()));
      const paragraph = isHeader
        ? `<p align="center"><b>${content}</b></p>`
        : `<p>${content}</p>`;
      return `<td>${paragraph}</td>`;
    })
    .join("");

  return `<tr>${renderedCells}</tr>`;
}

function splitTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = [];
  let cell = "";
  let escaped = false;

  for (const char of trimmed) {
    if (escaped) {
      cell += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "|") {
      cells.push(cell);
      cell = "";
      continue;
    }

    cell += char;
  }

  cells.push(cell);
  return cells;
}

function renderColgroup(headers) {
  const key = headers.map((header) => header.trim().toLowerCase()).join("|");
  const widths = tableWidthsFor(key, headers.length);

  return `<colgroup>${widths.map((width) => `<col width="${width}"/>`).join("")}</colgroup>`;
}

function tableWidthsFor(key, columnCount) {
  if (key === "contract field|value") return [184, 469];
  if (key === "status|body|notes") return [100, 597, 100];
  if (key === "column|type|notes") return [180, 180, 320];
  if (key === "field|required|type|notes") return [130, 100, 130, 360];
  if (columnCount === 2) return [184, 469];
  if (columnCount === 3) return [180, 180, 320];
  return Array.from({ length: columnCount }, () => 180);
}

function stripInlineCode(value) {
  const inlineCode = value.match(/^`([^`]+)`$/);
  return inlineCode ? inlineCode[1] : value;
}
