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

export function markdownToLarkHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCode = false;
  let codeBuffer = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
        codeBuffer = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

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

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    "  <title>RFC</title>",
    "</head>",
    "<body>",
    ...html,
    "</body>",
    "</html>"
  ].join("\n");
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
