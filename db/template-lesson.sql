-- ============================================================
-- 加一门新课程：复制这个文件 → 改名（比如 lesson3.sql）→ 改内容 → 跑命令
-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/lesson3.sql
-- ⚠️ 命令里的文件名必须和你复制出来的文件名一模一样，否则报 "Unable to read SQL text file"
-- 别忘了把讲义 PDF 放进 public/lesson/files/ 并 git push
-- ============================================================

-- ① 课程信息（id 是地址栏里的数字：/lesson/3）
-- 【修改示例】以后只想改课程名或状态，不用建文件，一行命令：
--   npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE lessons SET name='新课程名', status='已完结' WHERE id='3'"
-- 【正文示例】课程内容就是课程页显示的那段文字，支持 Markdown（**加粗**、- 列表等）
--   npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE lessons SET content='## 本课要点' WHERE id='3'"
INSERT INTO lessons (id, title, name, status, content, sort_order)
VALUES (
  '3',                    -- 课程编号（唯一，不能重复）
  '第三课',                -- 课时名（显示在列表左边）
  '分支结构程序设计',       -- 课程名（显示在列表右边）
  '更新中',                -- 状态：更新中 / 已完结
  '## 本课要点

- 认识 if 分支语句
- 学会使用关系表达式',     -- 课程正文（Markdown；没有就留 ''，课程页不显示这块）
  3                       -- 排序值：填和课时编号一样的数字（列表按课时由小到大自动排序）
);

-- ② 讲义文件（file_name 写 public/lesson/files/ 里那个文件名）
INSERT INTO lesson_files (lesson_id, file_name, label, tip, sort_order)
VALUES (
  '3',                        -- 对应上面的课程编号
  '3.pdf',                    -- 实际的 PDF 文件名（放在 public/lesson/files/ 下）
  '第三课-课堂讲义.pdf',        -- 下载时显示的名字
  '讲义随课程更新。',           -- 讲义下方的小字说明
  1
);

-- 【增加示例】再加一门课：把上面所有 '3' 换成新编号（如 '4'），
-- 或者复制下面两行、删掉行首的 "-- "，直接改内容（第一行加课程，第二行加讲义）
-- INSERT INTO lessons (id, title, name, status, content, sort_order) VALUES ('4', '第四课', '循环结构程序设计', '更新中', '## 本课要点', 4);
-- INSERT INTO lesson_files (lesson_id, file_name, label, tip, sort_order) VALUES ('4', '4.pdf', '第四课-课堂讲义.pdf', '讲义随课程更新。', 1);
