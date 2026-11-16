# 课程管理手册

课程数据存在云数据库（D1）的两张表里：

| 表 | 存什么 |
|---|---|
| `lessons` | 课程本体（课时名、课程名、状态、正文） |
| `lesson_files` | 课堂讲义（PDF 文件名、下载显示名、说明） |

讲义 PDF 文件本身放在 `public/lesson/files/` 里（需要 git push）。

所有命令都在项目根目录运行。**数据库命令改完刷新网页即可看到，不用 push；PDF 文件要 push。**

---

## 一、增加课程

### 步骤

```
① 把讲义 PDF 放进 public/lesson/files/（如 3.pdf）
② 复制 db/template-lesson.sql → 改名（如 lesson3.sql）
③ 打开副本，按下表逐项修改
④ 执行命令：
   npx wrangler d1 execute liyang-db --remote --yes --file=./db/lesson3.sql
⑤ PDF 文件和 db 里的新文件 git push 上线
```

⚠️ 命令里的文件名必须和实际文件名一模一样，否则报 `Unable to read SQL text file`。

### 需要设置的内容

| 位置 | 填什么 | 说明 |
|---|---|---|
| `'3'` | 课程编号 | **不能和已有课程重复**，正文和讲义两处 INSERT 都要一起改 |
| `'第三课'` | 课时名 | 显示在列表左边（如「第一课」「第二课」） |
| `'分支结构程序设计'` | 课程名 | 显示在列表右边 |
| `'更新中'` | 状态 | `更新中`（蓝色标签）或 `已完结`（绿色标签），不想要就填 `''` |
| 课程正文 | Markdown | 课程页正文；没有就填 `''`，课程页不显示这块 |
| `3` | 排序值 | 和课时编号一样的数字（列表按时段由小到大自动排） |
| `'3.pdf'` | 讲义文件名 | 就是放进 `public/lesson/files/` 的那个文件名 |
| `'第三课-课堂讲义.pdf'` | 下载显示名 | 访客下载时保存的文件名 |

### 快捷方式：一条命令直接加（不加讲义时）

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="INSERT INTO lessons (id, title, name, status, content, sort_order) VALUES ('3', '第三课', '分支结构程序设计', '更新中', '## 本课要点
- 学会使用关系表达式', 3)"
```

⚠️ 命令里换行的正文容易被 PowerShell 截断，**正文长就用 .sql 文件方式**（上面步骤②③④）。

### 以后只想改课程名 / 状态 / 正文

不用建文件，一行 UPDATE 命令：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE lessons SET name='新课程名', status='已完结' WHERE id='3'"
```

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE lessons SET content='## 本课要点' WHERE id='3'"
```

### 加完想确认

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, title, name, status FROM lessons ORDER BY CAST(id AS INTEGER)"
```

---

## 二、删除课程

一门课的数据在**两张表**里，**两张都要删**，漏一张就会留"孤儿数据"（或以后重插时主键冲突）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM lessons WHERE id='3'; DELETE FROM lesson_files WHERE lesson_id='3'"
```

⚠️ **两处课程编号必须完全一致**，只改其中一处是删错课的常见原因。

删之前先查一遍确认编号：

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, title, name FROM lessons ORDER BY CAST(id AS INTEGER)"
```

### 讲义 PDF 文件也要处理

数据库删了只是查不到这门课了，`public/lesson/files/3.pdf` 还在仓库里：

- 不想留 → 删掉这个 PDF，连同 git 一起 push
- 以后可能还用 → 留着，同时把 `db/lesson3.sql` 也留着，需要时按"增加课程"流程重新插入

删除是永久的，没有回收站。

---

## 附：快速排错

| 报错 | 原因 | 解决 |
|---|---|---|
| `Unable to read SQL text file` | 命令里的文件名和实际文件对不上 | 核对 `db/` 目录里的文件名 |
| `UNIQUE constraint failed: lessons.id` | 课程编号已存在 | 改课程应该用 UPDATE，别重跑 INSERT 文件 |
| `near "xxx": syntax error` | 内容里有单引号截断了字符串 | 文字里的 `'` 写成 `''`；复杂内容改用 `.sql` 文件执行 |
| 讲义下载 404 | `file_name` 和 `public/lesson/files/` 里的文件名对不上，或 PDF 还没 push | 核对文件名，确认 PDF 已 push 并等部署完成 |
| 课程加了但列表顺序不对 | `sort_order` 没按课时编号填 | 用 `UPDATE lessons SET sort_order=编号 WHERE id='编号'` 修正 |
