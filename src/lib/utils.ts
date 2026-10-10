/** Only allow same-site relative paths as post-login redirect targets. */
export function safePath(path: unknown): string {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return "/";
}
