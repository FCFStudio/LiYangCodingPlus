-- 励洋辅助站 D1 表结构
-- 执行：npx wrangler d1 execute liyang-db --local --file=./db/schema.sql
--       npx wrangler d1 execute liyang-db --remote --file=./db/schema.sql

-- 题目主表：题面内容存 Markdown（题目描述/输入格式/输出格式/提示）
CREATE TABLE IF NOT EXISTS problems (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    description   TEXT DEFAULT '',
    input_format  TEXT DEFAULT '',
    output_format TEXT DEFAULT '',
    hint          TEXT DEFAULT '',
    solution      TEXT DEFAULT '',
    sort_order    INTEGER DEFAULT 0,
    updated_at    TEXT DEFAULT (datetime('now', 'localtime'))
);

-- 题目标签（一题多标签）
CREATE TABLE IF NOT EXISTS problem_tags (
    problem_id TEXT NOT NULL,
    tag        TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (problem_id, tag)
);

-- 题目样例（一题多组，按 sort_order 排序）
CREATE TABLE IF NOT EXISTS problem_samples (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    problem_id TEXT NOT NULL,
    input      TEXT DEFAULT '',
    output     TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- 课程主表：id 为课程编号（对应 URL 的 ?id=），title 为课时名（如「第一课」）
-- content 为课程正文（Markdown 格式，可为空）
CREATE TABLE IF NOT EXISTS lessons (
    id         TEXT PRIMARY KEY,
    title      TEXT NOT NULL DEFAULT '',
    name       TEXT NOT NULL,
    status     TEXT DEFAULT '',
    content    TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
);

-- 课程讲义文件（文件本身放在 public/lesson/files/ 下，这里只存链接与显示名）
CREATE TABLE IF NOT EXISTS lesson_files (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id  TEXT NOT NULL,
    file_name  TEXT NOT NULL,
    label      TEXT DEFAULT '下载课堂讲义',
    tip        TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- 首页公告：id 自增（不用手填），按 date 排序（date 统一写 年-月-日）
CREATE TABLE IF NOT EXISTS announcements (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    content    TEXT NOT NULL,
    date       TEXT DEFAULT ''
);

-- 站点元信息（开站日期等）
CREATE TABLE IF NOT EXISTS site_meta (
    key   TEXT PRIMARY KEY,
    value TEXT
);

CREATE INDEX IF NOT EXISTS idx_problem_tags_pid ON problem_tags (problem_id);
CREATE INDEX IF NOT EXISTS idx_problem_samples_pid ON problem_samples (problem_id);
CREATE INDEX IF NOT EXISTS idx_lesson_files_lid ON lesson_files (lesson_id);
