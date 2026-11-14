# 题目管理手册

所有题目数据存在云数据库（D1）的三张表里：

| 表 | 存什么 |
|---|---|
| `problems` | 题目本体（题名、题面、输入输出格式、提示、题解） |
| `problem_tags` | 标签（每行一个标签） |
| `problem_samples` | 样例（每行一组 输入→输出） |

所有命令都在项目根目录运行。**改完刷新网页即可看到，不用 push。**

---

## 一、新建题

### 步骤

```
① 复制 db/template-problem.sql → 改名（如 1008.sql）
② 打开副本，按下表逐项修改
③ 执行命令：
   npx wrangler d1 execute liyang-db --remote --yes --file=./db/1008.sql
```

⚠️ 命令里的文件名必须和实际文件名一模一样，否则报 `Unable to read SQL text file`。

### 需要设置的内容

| 位置 | 填什么 | 说明 |
|---|---|---|
| `'1008'` | 题号 | **不能和已有题重复**，整个文件中出现多次都要一起改 |
| 题名 | `【编程入门】xxx` | 显示在列表和页面顶部 |
| 描述 | 题面正文 | 支持 Markdown |
| 输入格式 | 描述输入 | 支持 Markdown |
| 输出格式 | 描述输出 | 支持 Markdown |
| 提示 | 解题提示 | 不想要就填 `''`（留空） |
| 题解 | C++ 代码 | **代码里不要出现单引号**（写 `'A'` 改成 `65`，双引号 `"` 没问题） |
| 排序值 | 和题号一样 | 列表按题号从小到大自动排 |

### 题面写法注意

- 星号乘法式子直接写 `**1*2*3*...*n**` 即可正确显示；
  保险写法是 `**1&#42;2&#42;3&#42;...&#42;n**`（`&#42;` 显示为 `*`）
- 含单引号的文字（如 `I'm`）在 SQL 里要写成 `I''m`（两个单引号）
- Markdown 常用：`**加粗**`、`` `代码` ``、`- 列表`、`### 小标题`

### 标签和样例（文件最后几行）

```sql
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1008', '简单循环', 1);
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1008', '5', '120', 1);
```

- 多个标签就多写几行，`sort_order` 依次 1、2、3（决定显示顺序）
- 多组样例就多写几行，同样 1、2、3

---

## 二、修改题的某些信息

改已有题**一律用 UPDATE 命令，不要重跑新建的 .sql 文件**（题号已存在会主键冲突，执行中断，你以为改了其实没改进去）。

### 先查题号确认（防手滑）

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, name FROM problems ORDER BY CAST(id AS INTEGER)"
```

### 题目（名称）修改

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET name='新题名' WHERE id='1007'"
```

### 题面（描述）修改

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET description='新题面' WHERE id='1007'"
```

### 输入格式修改

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET input_format='新输入格式' WHERE id='1007'"
```

### 输出格式修改

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET output_format='新输出格式' WHERE id='1007'"
```

### 提示修改

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET hint='新提示' WHERE id='1007'"
```

不想要提示（留空）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET hint='' WHERE id='1007'"
```

### 题解修改

题解是 C++ 代码，**代码里含单引号时必须用 `.sql` 文件方式**（`--command` 里写会被 PowerShell 吞掉）。做法：

1. 在 `db/` 新建一个文件（如 `fix1007.sql`），内容：

```sql
UPDATE problems SET solution='#include <iostream>
using namespace std;
int main(){
	...
}
' WHERE id='1007';
```

2. 执行：`npx wrangler d1 execute liyang-db --remote --yes --file=./db/fix1007.sql`
3. 执行完可以删掉这个临时文件

代码里避免单引号最省事：字符比较用 ASCII 码（`'A'` 写成 `65`，`'.'` 写成 `46`）。

### 样例修改

先看当前样例（`sort_order` 是第几组）：

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT sort_order, input, output FROM problem_samples WHERE problem_id='1007' ORDER BY sort_order"
```

**修改某一组样例的输入/输出**（`sort_order=1` 表示第 1 组）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problem_samples SET input='新输入', output='新输出' WHERE problem_id='1007' AND sort_order=1"
```

只改输出、不动输入：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problem_samples SET output='8' WHERE problem_id='1007' AND sort_order=1"
```

### 增加样例

新增第 2 组样例：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1007', '新输入', '新输出', 2)"
```

⚠️ `sort_order` 要接在现有组数后面（已有 1 组就填 2），重复会插入失败。

### 删除样例

删除第 2 组样例：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM problem_samples WHERE problem_id='1007' AND sort_order=2"
```

删除这道题的全部样例：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM problem_samples WHERE problem_id='1007'"
```

### 标签修改

先看当前标签（`sort_order` 是显示顺序）：

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT tag, sort_order FROM problem_tags WHERE problem_id='1007' ORDER BY sort_order"
```

**改标签名**（如把「字符串」改成「字符串处理」）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problem_tags SET tag='字符串处理' WHERE problem_id='1007' AND tag='字符串'"
```

⚠️ 删标签和改名都要同时给题号和标签名，防止误伤别题的同名标签。

### 标签增加

新增一个标签，`sort_order` 接在现有标签后面（已有 2 个就填 3）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1007', '单测试点', 3)"
```

### 删除标签

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM problem_tags WHERE problem_id='1007' AND tag='浮点数'"
```

想整体重排标签，最干净的办法是全部删掉重插（一条命令里用分号连起来）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM problem_tags WHERE problem_id='1007'; INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1007', '字符串', 1); INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1007', '编程入门', 2)"
```

---

## 三、删除题

一道题的数据在**三张表**里，**三张都要删**，漏一张就会留"孤儿数据"（或以后重插时主键冲突）：

```bash
npx wrangler d1 execute liyang-db --remote --yes --command="DELETE FROM problems WHERE id='1007'; DELETE FROM problem_tags WHERE problem_id='1007'; DELETE FROM problem_samples WHERE problem_id='1007'"
```

⚠️ **三处题号必须完全一致**，只改其中一处是删错题的常见原因。

删之前先查一遍确认题号：

```bash
npx wrangler d1 execute liyang-db --remote --command="SELECT id, name FROM problems ORDER BY CAST(id AS INTEGER)"
```

删除是永久的，没有回收站。如果这题以后可能还用，把对应的 `db/xxx.sql` 文件留着，需要时按"新建题"流程重新插入。

---

## 附：快速排错

| 报错 | 原因 | 解决 |
|---|---|---|
| `Unable to read SQL text file` | 命令里的文件名和实际文件对不上 | 核对 `db/` 目录里的文件名 |
| `UNIQUE constraint failed: problems.id` | 题号已存在 | 改题应该用 UPDATE，别重跑 INSERT 文件 |
| `near "A": syntax error` | SQL 字符串里混入了裸引号（如 `\'A\'`） | 字符比较改用 ASCII 码（`65`），或用 `''` 转义 |
| `near "xxx": syntax error`（其他） | 内容里有单引号截断了字符串 | 文字里的 `'` 写成 `''`；复杂内容改用 `.sql` 文件执行 |
