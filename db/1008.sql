-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/1008.sql
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '1008',
  '【编程入门】字符图形9-数字正三角',
  '输入一个整数打印字符图形',
  '一个整数（０＜Ｎ＜１０）',
  '一个字符图形',
  '本题只有一个测试点',
  '#include <iostream>
using namespace std;
int main() {
    int N;
    cin >> N;
    for (int i = 1; i <= N; i++) {
        // 输出前导空格
        for (int j = 0; j < N - i; j++) {
            cout << " ";
        }
        // 输出数字 i，共 2*i-1 个
        for (int k = 0; k < 2 * i - 1; k++) {
            cout << i;
        }
        cout << endl;
    }
    return 0;
}
',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  1008                                   -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1008', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1008', '嵌套循环', 1);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('1008', '编程入门', 2);
-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('1008', '3','  1
 222
33333', 1);

