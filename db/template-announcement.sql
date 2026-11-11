-- 公告模板：复制本文件 → 随便改名（如 gg.sql）→ 改内容 → 执行
--   npx wrangler d1 execute liyang-db --remote --yes --file=./db/gg.sql
-- ⚠️ 命令里的文件名必须和你复制出来的文件名一模一样，否则报 "Unable to read SQL text file"
-- 改完刷新首页即可看到，不用 push、不用重新部署
--
-- 只需要填两样：公告内容、日期（日期统一写 年-月-日，如 2026-11-11）
-- 编号不用管，数据库自动生成；页面按日期排序，日期越新越靠上

-- 增加一条公告
-- 【增加示例】想再加一条？复制下面整行，改内容和日期即可（日期决定显示顺序）
-- 【修改示例】npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE announcements SET content='新内容' WHERE id=1"
-- 【删除示例】npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM announcements WHERE id=1"
INSERT INTO announcements (content, date)
VALUES ('这里写公告内容', '2026-11-11');

-- 【增加示例】想再加一条？把下面这行复制出去，删掉行首的 "-- " 就能用，改内容和日期即可
-- INSERT INTO announcements (content, date) VALUES ('第二条公告内容', '2026-11-12');
