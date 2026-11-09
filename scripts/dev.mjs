// 本地开发启动脚本：自动读取 wrangler.toml 里的 database_id，
// 避免换库时 package.json 与 wrangler.toml 两处不同步
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const toml = readFileSync(new URL("../wrangler.toml", import.meta.url), "utf8");
const id = (/database_id\s*=\s*"([^"]*)"/.exec(toml) || [])[1] || "";

if (!id || id.startsWith("00000000") || id === "11111111-2222-4333-8444-555555555555") {
  console.warn("\n[提示] wrangler.toml 里的 database_id 还是占位值。");
  console.warn("[提示] 本地开发不受影响，但线上部署前要换成 `npx wrangler d1 create liyang-db` 输出的真实 ID。\n");
}

const safeId = /^[0-9a-f-]+$/i.test(id) ? id : "";
const cmd = `npx wrangler pages dev public --port 8788${safeId ? ` --d1=DB=${safeId}` : ""}`;

console.log("启动本地预览：http://127.0.0.1:8788/problem\n");
const child = spawn(cmd, { stdio: "inherit", cwd: root, shell: true });
child.on("exit", (code) => process.exit(code ?? 0));
