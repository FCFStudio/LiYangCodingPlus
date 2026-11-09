-- ============================================================
-- 加一门新课程：复制这个文件 → 改名（比如 lesson3.sql）→ 改内容 → 跑命令
-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/lesson3.sql
-- 别忘了把讲义 PDF 放进 public/lesson/files/ 并 git push
-- ============================================================

-- ① 课程信息（id 是地址栏里的数字：lesson.html?id=3）
INSERT INTO lessons (id, title, name, status, sort_order)
VALUES (
  '3',                    -- 课程编号（唯一，不能重复）
  '第三课',                -- 课时名（显示在列表左边）
  '分支结构程序设计',       -- 课程名（显示在列表右边）
  '更新中',                -- 状态：更新中 / 已完结
  3                       -- 排序，数字小的排前面
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
