-- 由 db/seed-from-html.mjs 自动生成，可重复执行（INSERT OR REPLACE）

INSERT OR REPLACE INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order) VALUES (
  '0000', 'Test',
  '输入一个整数 **a** ，输出它。',
  '一行，一个整数 **a**',
  '一行，一个整数 **a**',
  '',
  '// 0000
#include <bits/stdc++.h>
using namespace std;
int main() {
    int a;
    cin>>a;
    cout<<a;
    return 0;
}', 0);

INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('0000', '测试', 1);

INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('0000', '1', '1', 1);

INSERT OR REPLACE INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order) VALUES (
  '1000', '【编程入门】熟悉一下Online Judge的环境',
  '请不要笑。用来适应环境的题目，自然比较简单些。 计算2个整数的和。这两个整数都在1到100之间。',
  '输入只有一行，包括2个整数 **a** , **b** 。之间用一个空格分开。',
  '输出只有一行（这意味着末尾有一个回车符号），包括1个整数。',
  '',
  '//1000
#include <bits/stdc++.h>
using namespace std;
int main() {
    int a,b;
    cin>>a>>b;
    cout<<a+b;
    return 0;
}', 1000);

INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('1000', '测试', 1);
INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('1000', '基础语法', 2);
INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('1000', '练习', 3);

INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1000', '1 2', '3', 1);

INSERT OR REPLACE INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order) VALUES (
  '1001', '【编程入门】A+B 输入输出练习I',
  '你的任务是计算a+b。这是为了acm初学者专门设计的题目。你肯定发现还有其他题目跟这道题的标题类似，这些问题也都是专门为初学者提供的。
输入两个数，回车后输出结果，然后再输入一对，回车再输出结果。。。。',
  '输入包含一系列的**a**和**b**对，通过空格隔开。一对**a**和**b**占一行。',
  '对于每次输入的每对**a**和**b**，你需要依次输出a、b的和。',
  '',
  '//1001
#include <bits/stdc++.h>
using namespace std;
int main(){
	int a,b;
	while(cin>>a>>b){
	    cout<<a+b<<endl;
	}
	return 0;
}', 1001);

INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('1001', '算法笔记', 1);
INSERT OR REPLACE INTO problem_tags (problem_id, tag, sort_order) VALUES ('1001', '基础循环', 2);

INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1001', '1 5', '6', 1);

INSERT OR REPLACE INTO lessons (id, title, name, status, sort_order) VALUES ('1', '第一课', '初识C++', '已完结', 1);
INSERT INTO lesson_files (lesson_id, file_name, label, tip, sort_order) VALUES ('1', '1.pdf', '第一课-课堂讲义.pdf', '讲义随课程更新。', 1);

INSERT OR REPLACE INTO lessons (id, title, name, status, sort_order) VALUES ('2', '第二课', '顺序结构程序设计', '更新中', 2);
INSERT INTO lesson_files (lesson_id, file_name, label, tip, sort_order) VALUES ('2', '2.pdf', '第二课-课堂讲义.pdf', '讲义随课程更新。', 1);

INSERT OR REPLACE INTO site_meta (key, value) VALUES ('start_date', '2026-11-06');
INSERT OR REPLACE INTO site_meta (key, value) VALUES ('site_version', '0.0.1');
