-- ============================================================
-- 加一道新题：复制这个文件 → 改名（比如 1002.sql）→ 改下面的内容 → 跑命令
-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1002.sql
-- ⚠️ 命令里的文件名必须和你复制出来的文件名一模一样，否则报 "Unable to read SQL text file"
-- 注意：三处 '1002' 都要改成你的新题号，题号不能和已有的重复
-- ============================================================
--
-- 【增加示例】想再加一道题 1003？整个文件里把 '1002' 全部换成 '1003'，内容换掉即可
-- 【修改示例】只改已上架题目的题面，不用建文件，一行命令：
--   npx wrangler d1 execute liyang-db --remote --yes --command="UPDATE problems SET description='**新题面**' WHERE id='1002'"
--
-- 题面写法（Markdown）：**加粗**  *斜体*  `行内代码`  - 列表项  ### 小标题  > 引用
-- 换行就敲回车，一段写完空一行。不用写 <p>、<b> 这类 HTML 标签

-- ① 题目本体
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1002',                              -- 题号（唯一）
  '【编程入门】两数求和',                -- 题目名字
  '输入两个整数 **a** 和 **b**，输出它们的和。',  -- 题目描述（Markdown）
  '一行两个整数，用空格隔开。',                   -- 输入格式（Markdown）
  '输出一个整数，表示两数之和。',                 -- 输出格式（Markdown）
  '',                                  -- 提示（没有就留空）
  '// 题解代码直接写，支持多行
#include <bits/stdc++.h>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  1002                                    -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);

-- ② 标签（不想要就整行删掉）
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1002', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1002', '基础语法', 1);

-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1002', '1 2', '3', 1);

-- 【增加示例】再加一道题：把上面三处的 '1002' 全换成新题号（如 '1003'），
-- 然后复制下面这行、删掉行首的 "-- "、换成新内容即可（这行是整道题的简写版）
-- INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order) VALUES ('1003', '新题名', '题面（Markdown，**加粗**）', '输入格式', '输出格式', '', '// 题解代码', 5);
