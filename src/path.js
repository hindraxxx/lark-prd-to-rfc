export function outputDirForSession(session) {
  if (!session) return undefined;
  if (session.startsWith("/") || session.startsWith("./") || session.startsWith("../")) {
    return session;
  }
  return `./output/${session}`;
}
