操作表  
增 删 改 查  
use myblog;  
show tables;  //查看表
-- show tables;  -- + " "是添加注释  
****  
insert into users(username, `password`, realname)values('zhangsan', '123', '张三');  
insert into users(username, `password`, realname)values('lisi', '456', '李四');  
//password是sql关键字  
select * from users;  //查询所有列（消耗性能）  
select id, username from users; // 查询两列

select * from users where username = 'zhangsan' and password = '123';  
//where 条件查询关键字 把and改成 or是并列条件查询  
select * from users where username like '%zhang%';  //模糊查询
select * from users where `password` like '%1%' order by id; //根据id排序
select * from users where `password` like '%1%' order by id desc; //desc倒序

update users set realname = '李四2' where username  = 'lisi'; //这句话会引发安全更新模式
使用 set SQL_SAFE_UPDATES = 0; 解除安全模式

delete from users where username = 'lisi' //删除操作 一定要加where 不然要坐牢。

软删除 设置一个表的 一个字段 state =1 默认数据有效
state = 0是默认无效
select * from users where state <> '0';    //<>是不等于的意思

****  
二. koa2重构blog

核心:  asycn await 语法  
1. await 后面可以追加 promise对象  
2.  await 必须包裹在  async函数里面  （否则会报错）  
3.  async 函数执行返回也是一个promise对象  
4.  try-catch 截获promise中 reject的值  
****  
三、线上环境  
1. 服务稳定性（不能一台客户端挂断就把服务器宕机，导致其他客户端访问也全部挂掉  
2. 充分利用服务器的硬件资源， 以提高性能  
3. 线上记录日志  
****  
为了解决上述的三个问题 使用PM2

* 进程守护，系统崩溃自动重启
* 启动多进程，充分利用内存和CPU
* 自带日志记录功能

****  
pm2常用命令  
  
 pm2 start...  //开启服务  
 pm2 list      //查看服务列表  
 pm2 restart <AppName>/<id>  //重开服务  
 pm2 stop <AppName>/<id> 
 pm2 delete <AppName>/<id>   //停止与删除  
 pm2 info <AppName>/<id> //查看基本信息
 pm2 log <AppName>/<id>  //查看log是怎么打印的  
 pm2 monit <AppName>/<id> //查看内存和CPU使用状况