-- ============================================================
-- 加一道新题：复制这个文件 → 改名（比如 1002.sql）→ 改下面的内容 → 跑命令
-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1002.sql
-- 注意：三处 '1002' 都要改成你的新题号，题号不能和已有的重复
-- ============================================================

-- ① 题目本体
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1002',                              -- 题号（唯一）
  '【编程入门】两数求和',                -- 题目名字
  '<p>输入两个整数，输出它们的和。</p>',  -- 题目描述（可写 HTML：<p> <b> <br>）
  '<p>一行两个整数，用空格隔开。</p>',    -- 输入格式
  '<p>一个整数。</p>',                   -- 输出格式
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
  4                                    -- 排序，数字小的排前面
);

-- ② 标签（不想要就整行删掉；要多个标签就再复制一行，改 tag 和 sort_order）
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1002', '基础语法', 1);

-- ③ 样例（要多组样例就复制这一行，把 sort_order 改成 2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1002', '1 2', '3', 1);
