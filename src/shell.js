import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function runConfiguredCommand(commandTemplate, values) {
  if (!commandTemplate) {
    throw new Error("Command template is required.");
  }

  const rendered = Object.entries(values).reduce(
    (command, [key, value]) => command.replaceAll(`{{${key}}}`, String(value ?? "")),
    commandTemplate
  );

  const result = await execFileAsync("sh", ["-lc", rendered], {
    maxBuffer: 10 * 1024 * 1024
  });

  return result.stdout;
}
