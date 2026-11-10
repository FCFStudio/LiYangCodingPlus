-- 公告模板：复制本文件为 db/announcement.sql，改内容后执行
--   npx wrangler d1 execute liyang-db --remote --yes --file=./db/announcement.sql
-- 改完刷新首页即可看到，不用 push、不用重新部署
--
-- 注意：id 不要和已有公告重复；sort_order 越小越靠前；date 就是页面上显示的日期

-- 增加一条公告
INSERT INTO announcements (id, content, date, sort_order)
VALUES (3, '这里写公告内容', '2026-11-10', 3);
