-- 运行：npx wrangler d1 execute liyang-db --remote --yes --file=./db/problem/4471.sql
INSERT INTO problems (id, name, description, input_format, output_format, hint, solution, sort_order)
VALUES (
  '4471',
  '静默带',
  '某个实验平台需要在一段持续时间内安排一次连续观测。平台上有***N***个独立的信号源，每个信号源会在若干个确定的时刻发出脉冲。观测前必须从这些信号源中选出***K***个，并把这***K***个信号源的脉冲视为会打断观测的事件。观测范围是从时刻***0***到时刻***T***的整段时间。请计算：选择方式最优时，平台能够找到的最长连续观测时间长度是多少。

设找到的时间窗为***(L,R)(L,R)***，其中***0≤L≤R≤T***。只有严格落在***L<t<R***内的脉冲才会打断该时间窗；恰好发生在***L***或***R***的脉冲不影响时间窗的有效性。时间窗长度定义为***R-L***。',
  '第一行输入三个整数***N,K,T***，分别表示信号源总数、必须选取的信号源数量以及观测结束时刻。
  接下来有***N***行，第***i***行先给出一个整数***m~i~***，随后给出***m~i~***个时刻。
  ***t~i,1~,t~i,2~,\.\.\.,t~i,m~i~~.***
  表示第***i***个信号源发出脉冲的时刻。每行中的时刻严格递增，但可以等于***0***或***T***。',
  '输出一个整数，表示在选取***K***个信号源后可以得到的最大时间窗长度。',
  '',
  '#include <bits/stdc++.h>
using namespace std;
const int N=3e5+10;
int n,k,T,m,b[N];
vector<pair<int,int> >a;
bool check(int x){
	memset(b,0,sizeof(b));
	int cnt=0;
	for(int l=0,r=1;r<a.size();r++){
		if(r-1>l&&a[r-1].second){
			b[a[r-1].second]++;
			if(b[a[r-1].second]==1) cnt++;
		}
		while(cnt>n-k){
			if(l+1<r&&a[l+1].second){
				b[a[l+1].second]--;
				if(b[a[l+1].second]==0)cnt--;
			}
			l++;
		}
		if(a[r].first-a[l].first>=x)return true;
	}
	return false;
} 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);cout.tie(0);
    cin>>n>>k>>T;
    a.push_back({0,0});
    for(int i=1;i<=n;i++){
    	cin>>m;
    	while(m--){
    		int t;
    		cin>>t;
    		a.push_back({t,i});
		} 
	}
	sort(a.begin(),a.end());
	a.push_back({T,0});
	int l=0,r=T,ans=-1;
	while(l<=r){
		int mid=(l+r)/2;
		if(check(mid)){
			ans=mid;
			l=mid+1;
		}else r=mid-1;
	}
	cout<<ans;
	return 0;
}
',                                    -- 题解（纯 C++ 代码，前端自动高亮）
  4471                                   -- 排序值：填和题号一样的数字（列表按题号由小到大自动排序）
);
-- 【增加示例】要两个标签就再加一行：INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('4471', '入门', 2);
INSERT INTO problem_tags (problem_id, tag, sort_order) VALUES ('4471', '二分答案', 1);
-- ③ 样例（【增加示例】要多组样例就复制这一行，sort_order 填第几组：1、2、3…）
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('4471', '3 2 5
1 1
1 4
2 2 3','3', 1);
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('4471', '2 2 7
8 0 1 2 3 4 5 6 7
8 0 1 2 3 4 5 6 7','1', 2);
INSERT INTO problem_samples (problem_id, input, output, sort_order) VALUES ('4471', '3 2 100
1 10
3 0 2 3
4 3 5 6 8','92', 3);
