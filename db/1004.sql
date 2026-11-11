-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1004.sql
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1004',
  '【编程入门】编程求1*2*3*...*n',
  '编程求 `1*2*3*...*n` 的值',
  '输入一行，只有一个整数n(1<=n<=10)',
  '输出只有一行（这意味着末尾有一个回车符号），包括1个整数。',
  '试着参考1003',
  '#include <bits/stdc++.h>
using namespace std;
int main(){
	int n,sum=1;
	cin>>n;
	for(int i=1;i<=n;i++)sum*=i;
	cout<<sum;
	return 0;
}
',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  1004                                   -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1002', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1004', '简单循环', 1);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1004', '编程入门', 2);
-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1004', '5', '120', 1);

