-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1005.sql
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1005',
  '【编程入门】已知一个圆的半径，求解该圆的面积和周长',
  '已知一个圆的半径，求解该圆的面积和周长',
  '输入只有一行，只有1个整数。',
  '输出只有两行，一行面积，一行周长。（保留两位小数）。 令pi=3.1415926',
  '圆的面积和周长求解公式分别如下；
圆的面积S = π * 半径 * 半径；（π读作pài，π = 3.1415926…，在具体的题目中π的值精确到小数点后多少位，取决于具体的题目）
圆的周长C = π * 2 * 半径；',
  '#include<bits/stdc++.h>
using namespace std;
int main(){
    double r;
    cin>>r;
    double c, a;
    c = 2*3.1415926*r;
    a = 3.1415926*r*r;
    cout<<fixed<<setprecision(2)<<a<<endl;
    cout<<fixed<<setprecision(2)<<c<<endl;
    return 0;
}
',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  1005                                   -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1002', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1005', '基础问题', 1);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1005', '编程入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1005', '浮点数', 3);
-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1005', '1', '3.14
6.28', 1);

