// 从现有静态题面/课程页提取内容，生成 db/seed.sql
// 用法：node db/seed-from-html.mjs
// 一次性迁移工具：以后内容直接在 D1 里改，不再需要它

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const q = (s) => "'" + String(s ?? "").replace(/'/g, "''") + "'";
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, "");

// HTML 片段 → Markdown（用于把旧版题面迁成 MD 存储）
function htmlToMd(html) {
  let t = String(html ?? "").trim();
  if (!t) return "";
  // 列表项
  t = t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  // 小标题
  t = t.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (m, lv, c) => "#".repeat(+lv) + " " + c.trim() + "\n\n");
  // 段落
  t = t.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  // 换行
  t = t.replace(/<br\s*\/?>/gi, "\n");
  // 链接
  t = t.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  // 行内样式
  t = t.replace(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi, "**$1**");
  t = t.replace(/<(?:i|em)>([\s\S]*?)<\/(?:i|em)>/gi, "*$1*");
  t = t.replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`");
  // 剥掉其余标签
  t = t.replace(/<[^>]+>/g, "");
  // 实体解码
  t = t.replace(/&nbsp;/gi, " ")
       .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
       .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
       .replace(/&amp;/g, "&");
  // 压缩多余空行
  return t.replace(/\n{3,}/g, "\n\n").trim();
}

// pre 内容保持原样；若含裸标签（未转义），做一次转义避免破坏 HTML
function safeCode(text) {
  const t = String(text ?? "").trim();
  if (/<[a-zA-Z/]/.test(t)) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  return t;
}

function sections(html) {
  const map = {};
  const re = /<section>\s*<h2>([\s\S]*?)<\/h2>([\s\S]*?)<\/section>/g;
  let m;
  while ((m = re.exec(html))) {
    map[m[1].trim()] = m[2].trim();
  }
  return map;
}

function samplesOf(sectionHtml) {
  const list = [];
  const re = /<h3>输入样例<\/h3>[\s\S]*?<pre>([\s\S]*?)<\/pre>[\s\S]*?<h3>输出样例<\/h3>[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  let m;
  while ((m = re.exec(sectionHtml))) {
    list.push({ input: safeCode(m[1]), output: safeCode(m[2]) });
  }
  // 兼容「输入/输出」分块顺序相反的写法
  if (!list.length) {
    const inp = /<h3>输入样例<\/h3>[\s\S]*?<pre>([\s\S]*?)<\/pre>/.exec(sectionHtml);
    const out = /<h3>输出样例<\/h3>[\s\S]*?<pre>([\s\S]*?)<\/pre>/.exec(sectionHtml);
    if (inp && out) list.push({ input: safeCode(inp[1]), output: safeCode(out[1]) });
  }
  return list;
}

const out = [];
out.push("-- 由 db/seed-from-html.mjs 自动生成，可重复执行（INSERT OR REPLACE）");
out.push("");

// ---------- 题目 ----------
// 旧版静态页面已归档到 legacy/static-pages/，本脚本只从那里提取
const pdir = join(root, "legacy/static-pages/problem");
const pfiles = readdirSync(pdir).filter((f) => /\.html$/i.test(f)).sort();
pfiles.forEach((file, idx) => {
  const raw = readFileSync(join(pdir, file), "utf8");
  const html = stripComments(raw);
  const pid = (/<span class="pid">([\s\S]*?)<\/span>/.exec(html) || [])[1]?.trim() || "";
  const pname = (/<span class="pname">([\s\S]*?)<\/span>/.exec(html) || [])[1]?.trim() || "";
  if (!pid) return;
  const tl = /时间限制：([^<]*)</.exec(html);
  const ml = /内存限制：([^<]*)</.exec(html);
  const tags = [...html.matchAll(/class="tag-item">([^<]*)</g)].map((m) => m[1].trim()).filter(Boolean);
  const secs = sections(html);
  const solution = (/<script type="text\/plain" id="solutionSource">([\s\S]*?)<\/script>/.exec(html) || [])[1] || "";
  const samples = samplesOf(secs["样例"] || "");

  out.push(`INSERT OR REPLACE INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order) VALUES (`);
  out.push(`  ${q(pid)}, ${q(pname)},`);
  out.push(`  ${q(htmlToMd(secs["题目描述"]))},`);
  out.push(`  ${q(htmlToMd(secs["输入格式"]))},`);
  out.push(`  ${q(htmlToMd(secs["输出格式"]))},`);
  out.push(`  ${q(htmlToMd(secs["提示"] || secs["说明"]))},`);
  out.push(`  ${q(solution.trim())}, ${idx + 1});`);
  out.push("");

  tags.forEach((t, i) => {
    out.push(`INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES (${q(pid)}, ${q(t)}, ${i + 1});`);
  });
  if (tags.length) out.push("");

  samples.forEach((s, i) => {
    out.push(`INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES (${q(pid)}, ${q(s.input)}, ${q(s.output)}, ${i + 1});`);
  });
  if (samples.length) out.push("");
});

// ---------- 课程 ----------
const ldir = join(root, "legacy/static-pages/lesson");
const lfiles = readdirSync(ldir).filter((f) => /^[^.]+\.html$/i.test(f)).sort((a, b) => parseInt(a) - parseInt(b));
lfiles.forEach((file, idx) => {
  const raw = readFileSync(join(ldir, file), "utf8");
  const html = stripComments(raw);
  const lid = (/<span class="lid">([\s\S]*?)<\/span>/.exec(html) || [])[1]?.trim() || "";
  const lname = (/<span class="lname">([\s\S]*?)<\/span>/.exec(html) || [])[1]?.trim() || "";
  if (!lid) return;
  const status = (/状态：([^<]*)</.exec(html) || [])[1]?.trim() || "";
  const href = (/class="handout-btn" href="([^"]+)"/.exec(html) || [])[1] || "";
  const label = (/class="handout-btn"[\s\S]*?download="([^"]+)"/.exec(html) || [])[1] || "下载课堂讲义";
  const tip = (/class="handout-tip">([^<]*)</.exec(html) || [])[1]?.trim() || "";
  // 课程 id 用文件名（1、2…），课时名（第一课）存 title
  const lessonKey = file.replace(/\.html$/i, "");

  out.push(`INSERT OR REPLACE INTO lessons (id, title, name, status, sort_order) VALUES (${q(lessonKey)}, ${q(lid)}, ${q(lname)}, ${q(status)}, ${idx + 1});`);
  if (href) {
    const fileName = href.replace(/^files\//, "");
    out.push(`INSERT INTO lesson_files (lesson_id, file_name, label, tip, sort_order) VALUES (${q(lessonKey)}, ${q(fileName)}, ${q(label)}, ${q(tip)}, 1);`);
  }
  out.push("");
});

// ---------- 公告与站点信息 ----------
out.push(`INSERT OR REPLACE INTO announcements (id, content, date, sort_order) VALUES (1, '励洋辅助站0.0.1更新迎来', '2026-11-06', 1);`);
out.push(`INSERT OR REPLACE INTO announcements (id, content, date, sort_order) VALUES (2, '励洋辅助站建成', '2026-11-06', 2);`);
out.push(`INSERT OR REPLACE INTO site_meta (key, value) VALUES ('start_date', '2026-11-06');`);
out.push(`INSERT OR REPLACE INTO site_meta (key, value) VALUES ('site_version', '0.0.1');`);
out.push("");

const sql = out.join("\n");
writeFileSync(join(root, "db/seed.sql"), sql, "utf8");
console.log(`已生成 db/seed.sql（${pfiles.length} 个题面文件，${lfiles.length} 个课程文件）`);
