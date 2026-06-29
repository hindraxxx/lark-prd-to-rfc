export function parseLarkUrl(input) {
  const url = new URL(input);
  const parts = url.pathname.split("/").filter(Boolean);

  const findTokenAfter = (segment) => {
    const index = parts.indexOf(segment);
    return index >= 0 ? parts[index + 1] : undefined;
  };

  const docxToken = findTokenAfter("docx");
  if (docxToken) return { kind: "docx", token: cleanToken(docxToken), host: url.host };

  const wikiToken = findTokenAfter("wiki");
  if (wikiToken) return { kind: "wiki", token: cleanToken(wikiToken), host: url.host };

  const docsToken = findTokenAfter("docs") ?? findTokenAfter("doc");
  if (docsToken) return { kind: "legacy_doc", token: cleanToken(docsToken), host: url.host };

  throw new Error(`Unsupported Lark URL path: ${url.pathname}`);
}

function cleanToken(token) {
  return token.split("?")[0].split("#")[0];
}
