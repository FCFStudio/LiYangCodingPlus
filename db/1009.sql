-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1009.sql
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1009',
  '【编程入门】数组逆序',
  '给你m个整数，将其逆序输出',
  '第一行一个整数m（3 <= m <= 100 )：数的个数 第二行m个整数（空格隔开）（这些数在0-9999999之间)',
  'm个整数（空格隔开）',
  '',
  '#include <bits/stdc++.h>
using namespace std;
int a[110];
int main(){
	int m;
	cin>>m;
	for(int i=1;i<=m;i++)cin>>a[i];
	for(int i=m;i>=1;i--)cout<<a[i]<<&#39; &#39;;
	return 0;
				
}
',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  1009                                   -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1009', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1009', '数组问题', 1);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1009', '编程入门', 2);
-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1009', '3
1 7 5','5 7 1', 1);

