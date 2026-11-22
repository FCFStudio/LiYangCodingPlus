# 公告管理手册

公告数据存在云数据库（D1）的 `announcements` 表里：

| 字段 | 存什么 |
|---|---|
| `id` | 编号（数据库自动生成，**不用手填**） |
| `content` | 公告内容（首页逐条显示） |
| `date` | 日期（`年-月-日` 格式，**日期越新越靠上**） |

所有命令都在项目根目录运行。**改完刷新网页即可看到，不用 push。**

---

## 一、增加公告（含在某日期插入）

### 方式一：一条命令直接加（推荐，短公告用这个）

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="INSERT INTO announcements (content, date) VALUES ('本站课程更新至1007', '2026-11-17')"
```

- `'本站课程更新至1007'` → 公告内容
- `'2026-11-17'` → 日期，**决定显示位置**：比现有日期新就排最上面，比现有日期旧就排在下面（即"插入到某个日期"）

### 方式二：用 .sql 文件（内容长或一次加多条）

1. 在 `db/gg/` 新建一个文件（如 `gg1120.sql`），内容：

```sql
INSERT INTO announcements (content, date) VALUES ('公告内容一', '2026-11-20');
INSERT INTO announcements (content, date) VALUES ('公告内容二', '2026-11-20');
```

2. 执行：`npx wrangler d1 execute liyang-db --remote --yes --file=./db/gg/gg1120.sql`
3. 执行完可以删掉这个临时文件

⚠️ 命令里的文件名必须和实际文件名一模一样，否则报 `Unable to read SQL text file`。

⚠️ 内容里有单引号（如 `I'm`）要写成 `I''m`（两个单引号）。

### 加完想确认

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, date, content FROM announcements ORDER BY date DESC, id DESC"
```

---

## 二、删除公告

### 先查编号（防手滑）

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, date, content FROM announcements ORDER BY date DESC, id DESC"
```

### 按编号删一条

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM announcements WHERE id=3"
```

⚠️ `id` 是数字，**不要加引号**（`WHERE id=3`，不是 `WHERE id='3'`）。

### 按日期删（一次删掉某天的全部公告）

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM announcements WHERE date='2026-11-12'"
```

删除是永久的，没有回收站。如果这条公告以后可能还用，把内容先记在别处。

---

## 三、清空公告

一键删掉全部公告（首页公告区变空）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM announcements"
```

⚠️ **这条没有 WHERE 条件，删的是全表**，执行前想清楚。建议先跑一遍上面"先查编号"的命令留个底。

清空后重新加公告，直接按"一、增加公告"操作即可，编号从断点继续（不影响使用）。

---

## 附：快速排错

| 报错 | 原因 | 解决 |
|---|---|---|
| `Unable to read SQL text file` | 命令里的文件名和实际文件对不上 | 核对 `db/` 对应分类目录（problem/lesson/gg）里的文件名 |
| `near "xxx": syntax error` | 内容里有单引号截断了字符串 | 文字里的 `'` 写成 `''`；复杂内容改用 `.sql` 文件执行 |
| `no such table: announcements` | 数据库还没建表 | 先按 `db/schema.sql` 顶部注释执行建表命令 |
| 公告加了但首页不显示 | 日期格式不对 | `date` 统一写 `年-月-日`（如 `2026-11-17`） |
