// Hugo >= 0.161 executes Tailwind through Node; pnpm's POSIX shell shim is incompatible.
import { lstat, unlink, symlink, access } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
if (process.platform !== "win32") {
  const target = path.join(root, "node_modules/@tailwindcss/cli/dist/index.mjs");
  const bin = path.join(root, "node_modules/.bin/tailwindcss");
  await access(target);
  try { await lstat(bin); await unlink(bin); } catch (error) { if (error.code !== "ENOENT") throw error; }
  await symlink(path.relative(path.dirname(bin), target), bin);
}
