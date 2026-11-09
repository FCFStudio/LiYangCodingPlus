# 励洋辅助站

为励洋编程制作的辅助站点：查看题解、查看讲义、查看课程。

**不需要登录**：任何人打开链接就能看题、看讲义，即使还没学到那一课也能直接下载资料。

## 技术栈

- **Cloudflare Pages**：托管静态资源（HTML / CSS / JS / PDF）
- **Pages Functions**：`functions/api/*` 提供 JSON 接口
- **Cloudflare D1**（SQLite）：存题目、课程、公告等结构化内容

题目和课程不再一题一页、一课一页，而是由同一个页面从数据库读取内容动态渲染，并使用洛谷式地址：

| 地址 | 内容 |
|---|---|
| `/problem` | 题目列表（可搜索） |
| `/problem/1000` | 题号 1000 的题面（不存在的题号返回真正的 404 页） |
| `/lesson` | 课程列表（可搜索） |
| `/lesson/1` | 第 1 课 |

路由由 `functions/problem/[id].js` 和 `functions/lesson/[id].js` 实现：题号存在时返回页面壳（内容由前端调接口渲染），旧版 `/problem/1000.html` 这类链接会 301 到新地址。

## 目录结构

```
public/                 静态资源（Pages 输出目录）
  index.html            首页
  problem.html          题目列表 + 题面（?id= 切换）
  lesson.html           课程列表 + 课程页（?id= 切换）
  about/                关于页
  common.css            全站基础样式（变量、导航栏）
  nav.js                全站公共导航栏
  problem/style.css     题目页公共样式
  problem/highlight.js  题解语法高亮与行号
  lesson/style.css      课程页公共样式
  lesson/files/         讲义 PDF
functions/api/          接口
  problems.js           GET /api/problems
  problem.js            GET /api/problem?id=
  lessons.js            GET /api/lessons
  lesson.js             GET /api/lesson?id=
  announcements.js      GET /api/announcements
  _lib.js               公共工具（下划线开头不会被当成路由）
db/
  schema.sql            建表语句
  seed.sql              初始数据
  seed-from-html.mjs    从旧静态页面提取数据（一次性迁移工具）
wrangler.toml           Pages + D1 配置
legacy/                 旧版静态站归档
```

## 本地开发

```bash
npm install -g wrangler        # 如果还没装
npm run db:init                # 本地建表
npm run db:seed                # 本地导入初始数据
npm run dev                    # 启动 http://127.0.0.1:8788
```

本地数据库文件在 `.wrangler/state/`，删掉即可重置（重置后重新执行 `db:init` + `db:seed`）。

## 首次部署

1. **创建 D1 数据库**

   ```bash
   npx wrangler login
   npx wrangler d1 create liyang-db
   ```

   把输出的 `database_id` 填进 `wrangler.toml`，同时把 `package.json` 里 `dev` 脚本中 `--d1=DB=...` 的值也换成该 ID。

2. **建表并导入数据（线上库）**

   ```bash
   npm run db:init:remote
   npm run db:seed:remote
   ```

3. **创建 Pages 项目**：连接 Git 仓库，构建输出目录填 `public`，框架预设选 None。
   `functions/` 目录放在仓库根即可，Pages 会自动识别（注意是复数 `functions`）。

4. **绑定数据库**：Pages 项目 → Settings → Bindings → 添加 D1 database binding：
   - Variable name: `DB`
   - D1 database: `liyang-db`

5. 重新部署一次，访问 `/api/problems` 应返回 JSON。

## 内容维护

内容都在 D1 里，用 SQL 改。常用操作：

```bash
# 修改某题题面
npx wrangler d1 execute liyang-db --remote --command="UPDATE problems SET description='<p>新题面</p>' WHERE id='1000'"

# 新增题目
npx wrangler d1 execute liyang-db --remote --command="INSERT INTO problems (id,name,time_limit,memory_limit,description,input_format,output_format,solution) VALUES ('1002','新题','1.00s','128MB','<p>描述</p>','<p>输入</p>','<p>输出</p>','int main(){}')"

# 加标签
npx wrangler d1 execute liyang-db --remote --command="INSERT INTO problem_tags (problem_id,tag,sort_order) VALUES ('1002','基础语法',1)"

# 查看所有题目
npx wrangler d1 execute liyang-db --remote --command="SELECT id,name FROM problems"
```

字段说明见 `db/schema.sql`：

- `problems.description / input_format / output_format / hint` 存 HTML 片段（可写 `<b>` 等简单标签）
- `problems.solution` 存**纯文本 C++ 代码**，前端自动高亮和生成行号
- `problem_samples` 一题可多组样例
- `lesson_files.file_name` 是 `public/lesson/files/` 下的文件名，`label` 是下载显示名

## 旧版归档

`legacy/` 下保留了迁移前的静态页面（一题一页、一课一页）与老的清单生成脚本，仅作参考，不参与部署。
