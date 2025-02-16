## 数据库的概念
+ **数据库：** DataBase（DB），是存储和管理数据的仓库
+ **数据库管理系统：** DataBase Management System（DBMS），操纵和管理数据库的大型软件
+ **SQL：** Structured Query Language，操作关系型数据库的编程语言，定义了一套操作关系型数据库统一标准

## 连接数据库
```sql
mysql -u用户名 -p密码 [-h数据库服务器IP地址 -P端口号]
```

## SQL
> SQL是一种操作关系型数据库的结构化查询语言
>

### 常用数据类型
1. **数值类型**

| 类型 | 大小(byte) | 有符号(SIGNED)范围 | 无符号(UNSIGNED)范围 | 描述 |
| :---: | :---: | :---: | :---: | :---: |
| tinyint | 1 | (-128, 127) | (0, 255) | 小整数值 |
| int | 4 | (-2147483648, 2147483647) | (0, 4294967295) | 大整数值 |
| bigint | 8 | (-2^63, 2^63-1) | (0, 2^64 -1) | 极大整数值 |


2. **字符串类型**

| 类型 | 大小 | 描述 |
| :---: | :---: | :---: |
| char | 0-255 (bytes) | 定长字符串 |
| varchar | 0-65535 (bytes) | 变长字符串 |


3. **日期类型**

| 类型 | 大小(byte) | 范围 | 格式 | 描述 |
| :---: | :---: | :---: | :---: | :---: |
| date | 3 | 1000-01-01 至 9999-12-31 | YYYY-MM-DD | 日期值 |
| datetime | 8 | 1000-01-01 00:00:0 至 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值 |


### SQL语句的执行顺序
+ `**from**`** > **`**on**`** > **`**join**`** > **`**where**`** > **`**group by**`** > **`**having**`** > **`**select**`** > **`**distinct**`** > **`**order by**`** > **`**limit**`

```sql
-- SQL完整语句
select distinct * -- 查询所有字段，distinct表示去重
from table1 as t1 -- 从table1表中查询
         inner join table2 as t2 on t1.id = t2.id -- 从table2表中查询，t1.id = t2.id是连接条件，inner join表示内连接，还有left join、right join、full join，分别表示左连接、右连接、全连接
where t1.id = 1 -- 查询条件
group by t1.id -- 分组条件
having t1.id > 1 -- 分组后的查询条件
order by t1.id desc -- 排序条件，desc表示降序，asc表示升序，默认升序
limit 10; -- 查询前10条，limit 10, 20表示查询第10条到第20条
```

### DDL
> 定义数据库、表、字段
>

#### 数据库操作
```sql
-- 显示服务器中所有数据库
show databases;

-- 查询当前数据库
select database();

-- 选择要使用的数据库
use 数据库名;

-- 创建数据库
create database [if not exists] 数据库名 [default charset utf8mb4];

-- 删除数据库
drop database [if exists] 数据库名;
```

#### 表操作
+ **约束：**
    - `**not null**` - **非空约束**，限制该字段值不能为 null
    - `**unique**` - **唯一约束**，保证字段的所有数据都是唯一、不重复的
    - `**primary key**` - **主键约束**，主键是一行数据的唯一标识，要求非空且唯一
    - `**default**` - **默认约束**，保存数据时，如果未指定该字段值，则采用默认值
    - `**foreign key**` - **外键约束**，让两张表的数据建立连接，保证数据的一致性和完整性
+ **说明：**
    - `**unsigned**` - 表示该字段只能为正数
    - `**zerofill**` - 表示该字段在显示时，前面补 0
    - `**auto_increment**` - 表示该字段的值会自动增长

```sql
-- 创建表（语法）
create table tablename(
  字段1 字段类型 [约束] [comment 字段1注释],
  ...
  字段2 字段类型 [约束] [comment 字段2注释],
)[comment 表注释];

-- 示例：
create table employees
(
    id          int unsigned primary key auto_increment comment 'ID,主键',
    username    varchar(20)      not null unique comment '用户名',
    password    varchar(50) default '123456' comment '密码',
    name        varchar(10)      not null comment '姓名',
    gender      tinyint unsigned not null comment '性别,1-男,2-女',
    phone       char(11)         not null unique comment '手机号',
    job         tinyint unsigned comment '职位,1-班主任,2-讲师,3-学生主管,4-教研主管,5-咨询师',
    salary      int unsigned comment '薪资',
    entry_date  date comment '入职日期',
    image       varchar(300) comment '头像',
    create_time datetime comment '创建时间',
    update_time datetime comment '更新时间'
) comment '员工表';
```

```sql
-- 显示当前数据库中的所有表
show tables;

-- 查看表结构
desc 表名;

-- 查询建表语句
show create table 表名;

-- 添加字段
alter table 表名 add column 字段名 类型(长度) [comment 注释] [约束];

-- 修改字段类型
alter table 表名 modify column 字段名 新数据类型(长度) [comment 注释] [约束];

-- 修改字段名称
alter table 表名 change column 旧字段名 新字段名 类型(长度) [comment 注释] [约束];

-- 删除字段
alter table 表名 drop column 字段名;

-- 修改表名
alter table 表名 rename to 新表名;

-- 删除表
drop table [if exists] 表名;
```

### DML
> 对数据库表中的数据记录进行增、删、改操作
>

#### 添加数据 - insert
```sql
-- 指定字段添加数据
insert into 表名(字段名1, 字段名2) values (值1, 值2);

-- 全部字段添加数据
insert into 表名 values (值1, 值2, ...);

-- 批量添加数据(指定字段)
insert into 表名(字段名1, 字段名2) values (值1, 值2), (值1, 值2);

-- 批量添加数据(全部字段)
insert into 表名 values (值1, 值2, ...), (值1, 值2, ...);
```

#### 修改数据 - update
+ **注意：**`**update**` 语句中如果不加条件，则会修改整张表的所有数据

```sql
-- 修改数据
update 表名 set 字段名1 = 值1, 字段名2 = 值2, ... [where 条件];
```

#### 删除数据 - delete
+ **注意：**`**delete**` 语句中如果不加条件，则会删除整张表的所有数据

```sql
-- 删除数据
delete from 表名 [where 条件];
```

### DQL
> 查询数据库表中的记录
>

```sql
-- 完整查询语句语法
select
	字段列表
from
	表名列表
where
	条件列表
group by
	分组字段列表
having
	分组后条件列表
order by
	排序字段列表
limit
	分页参数
```

#### 基本查询 - select ... from ...
```sql
-- 查询多个字段
select 字段1, 字段2, 字段3 from 表名;

-- 查询所有字段(通配符)
select * from 表名;

-- 为查询字段设置别名，as 关键字可以省略
select 字段1 [as 别名1], 字段2 [as 别名2] from 表名

-- 去除重复记录
select distinct 字段列表 from 表名;
```

#### 条件查询 - where
| 运算符 | 功能 |
| --- | --- |
| > | 大于 |
| >= | 大于等于 |
| < | 小于 |
| <= | 小于等于 |
| = | 等于 |
| <> 或 != | 不等于 |
| between ... and ... | 在某个范围之内 (含最小、最大值) |
| in (...) | 在 `**in**` 之后的列表中的值，多选一 |
| like 占位符 | 模糊匹配 (`**_**` 单个任意字符，`**%**` 多个任意字符) |
| is null | 是 null |
| is not null | 不是 null |
| and 或 && | 并且 (多个条件同时成立) |
| or 或 || | 或者 (多个条件任意一个成立) |
| not 或 ! | 非，不是 |


```sql
-- 条件查询
select 字段列表 from 表名 where 条件列表;
```

#### 分组查询 - group by
+ **聚合函数：**将一列数据作为一个整体，进行纵向计算
    - `**count()**` - 统计数量
    - `**max()**` - 最大值
    - `**min()**` - 最小值
    - `**avg()**` - 平均值
    - `**sum()**` - 求和
+ **where 与 having 的区别：**
    1. **执行时机不同：**`**where**` 是分组之前进行过滤，不满足 `**where**` 条件，不参与分组；而 `**having**` 是分组之后对结果进行过滤
    2. **判断条件不同：**`**where**` 不能对聚合函数进行判断，而 `**having**` 可以
+ **注意：**
    - `**null**` 值不参与所有聚合函数的运算
    - 统计数量可以使用：`**count(*)**`、`**count(字段)**`、`**count(常量)**`，推荐使用 `**count(*)**`
    - 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义
    - **执行顺序：where > 聚合函数 > having**

```sql
-- 分组查询
select 字段列表 from 表名 [where 条件列表] group by 分组字段名 [having 分组后过滤条件];
```

#### 排序查询 - order by
+ **排序方式**
    - `**asc**` - 升序（默认）
    - `**desc**` - 降序
+ **注意：**如果是多字段排序，当第一个字段值相同，才会根据第二个字段进行排序

```sql
-- 排序查询
select 字段列表 from 表名 [where 条件列表] [group by 分组字段名 having 分组后过滤条件] order by 排序字段 排序方式;
```

#### 分页查询 - limit
+ **起始索引：**从 0 开始，索引是 0 表示数据表第一行数据
+ **计算公式：起始索引 = (当前页码 - 1) * 每页显示的条数**
+ **说明：**分页查询 `**limit**` 是 MySQL 数据库特有的关键字

```sql
-- 分页查询
select 字段 from 表名 [where 条件] [group by 分组字段 having 过滤条件] [order by 排序字段] limit 起始索引,查询记录数;
```

## 数据库的备份和还原
### 编辑器操作
1. **备份数据库**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1705163872922-b3b43e60-1a2f-450e-84aa-1ab9200d3a31.png)

2. **还原数据库**
    - **创建一个新的数据库，名字自定义**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1705164783120-e04aca8b-4fbf-4cb8-9b2d-4985ad76ce4a.png)

### 命令行操作
+ **<font style="color:#DF2A3F;">注意：命令需在DOS窗口/Linux系统中运行</font>**

```shell
# 备份数据库db1
mysqldump -uroot -p db1 > C:\Users\24798\OneDrive\桌面\db1.sql

# 还原数据库db2
mysql -uroot -p db2 < C:\Users\24798\OneDrive\桌面\db1.sql
```

## 约束
> 约束其实就是一种限制，用于修饰表中的列，通过这种限制来保证表中数据的正确性、有效性和完整性
>

| 约束名称 | 关键字 | 作用 |
| --- | --- | --- |
| 主键约束 | primary key | 唯一 + 非空 |
| 唯一约束 | unique | 唯一 |
| 非空约束 | not null | 非空 |
| 默认值约束 | default 默认的值 | 指定的默认值 |
| 外键约束 | foreign key | 多表之间的关系约束 |


### 主键约束 - primary key
> 能够唯一的标识表中的每一行数据
>

1. **主键定义**

```sql
-- 语法
create table 表名 (id int primary key, 其他字段, ...); -- 创建表时定义主键
alter table 表名 add primary key(字段); -- 已有表中定义主键
alter table 表名 drop primary key; -- 删除主键

-- 例子
create table student
(
    id   int primary key,
    name varchar(20),
    age  int
);

alter table student drop primary key;

alter table student add primary key(id);
```

2. **主键自增**
    - **<font style="color:#DF2A3F;">注意：需要让主键自动增加，主键需要是整数类型</font>**

```sql
-- 语法
字段名 字段类型 primary key auto_increment;

-- 例子
create table student2
(
    id   int primary key auto_increment,
    name varchar(20) not null
);
```

### 唯一约束 - unique
+ **作用：**被唯一约束的字段，本列数据不允许出现重复数据，null除外，null可以出现多个

```sql
-- 语法
create table 表名 (字段名 字段类型 unique, ...); -- 创建表时指定唯一约束
alter table 表名 add unique(字段); -- 已有表中添加唯一约束

-- 例子
create table student
(
    id   int primary key,
    name varchar(20) unique,
    age  int
);

alter table student add unique(name);
```

### 非空约束 - not null
+ **作用：**被非空约束的字段，本列数据不允许出现null（即空）数据。插入数据如果该字段为空将会报错。

```sql
-- 语法
create table 表名 (字段名 字段类型 not null, ...); -- 创建表时指定非空约束
alter table 表名 modify 字段 类型 not null; -- 已有表中添加非空约束

-- 例子
create table student
(
    id   int primary key auto_increment,
    name varchar(20) not null unique
)

alter table student modify name varchar(20) not null;
```

**非空+唯一约束 和 主键约束的区别**

1. 主键约束在表中只能存在一个，但是非空+唯一约束可以存在多个
2. 主键可以添加自增约束，但是非空+唯一约束不能
3. 主键约束底层维护了一个主键索引，而唯一约束底层维护的是唯一索引

### 默认值约束 - default 默认值
+ **作用：**被默认值约束的字段，相当于给字段添加默认值，插入数据时如果字段没有被赋值，则使用默认值

```sql
-- 语法
create table 表名 (字段名 字段类型 default 默认值, ...); -- 创建表时指定默认值约束
alter table 表名 modify 字段 类型 default 默认值; -- 已有表中添加默认值约束

-- 例子
create table student
(
    id   int primary key auto_increment,
    name varchar(20) default '无名氏'
)

alter table student modify name varchar(20) default '无名氏';
```

### 外键约束 - foreign key（开发中一般不会使用）
> 外键就是从表中设定的一个字段，用来保存主表中的主键值。外键约束了从表的外键值只能是主表的主键值
>

#### 定义外键
```sql
-- 语法
-- 方式一：创建表时创建外键（常用）
create table 表名 (
  ...
  外键字段名 int,
  constraint 外键名 foreign key(当前表外键字段名) references 主表名(主表主键)
);
-- 方式二：修改字段为外键
alter table 表名 add constraint 外键名 foreign key(当前表外键字段名) references 主表名(主表主键);

-- 例子
create table student
(
    id       int primary key auto_increment,
    name     varchar(20) not null,
    age      int,
    class_id int,
    constraint fk_class_id foreign key (class_id) references class (id)
);

alter table student
    add constraint fk_classid foreign key (classid) references class (id);
```

#### 删除外键
```sql
-- 语法
alter table 从表名 drop foreign key 外键名;

-- 例子
alter table student
    drop foreign key student_ibfk_1;
```

#### 注意事项
1. **添加数据时：**先添加主表中的数据，再添加从表中的数据
2. **删除数据时：**先删从表中的数据，再删主表中的数据
3. **修改数据时：**如果主表中的主键被从表引用了，不能修改此主键的值
+ **扩展：外键的级联 - 级联操作就是在修改或者删除主键时，可以同时对从表的外键进行修改删除**

```sql
-- 语法
on update cascade -- 表示主表进行更新操作后，从表对应的数据也要进行更新操作
on delete cascade -- 表示主表进行主键删除后，从表外键对应的数据也要删除

alter table t1
    add constraint fk1 foreign key (id) references t2 (id) on update cascade on delete cascade;
```

## 表关系
> 数据库中的表描述的事物，我们一般称为实体。现实生活中事物与事物之间存在关系，映射到数据库就是实体与实体之间存在关系
>

| 表关系 | 设计方式 |
| --- | --- |
| 一对一 | 任选一方为从表建立唯一约束的外键或者主外键一体 |
| 一对多 | 在从表（多方）创建一个字段作为外键，从表外键值指向主表（一方）的主键 |
| 多对多 | 需要创建第三张表作为中间表，中间表至少两个字段，这两个字段分别作为外键指向各自一方的主键 |


## 多表查询
### 消除笛卡尔积
```sql
-- 语法
where 从表.外键 = 主表.主键

-- 例子
select *
from emp,
     dept
where emp.dept_id = dept.id;
```

### 内连接查询
> 内连接操作目的是把多张表中相互关联的数据查出来
>

1. **隐式内连接**

```sql
-- 语法
select 列名 from 主表, 从表 where 从表.外键 = 主表.主键

-- 例子
select *
from emp,
     dept
where emp.dept_id = dept.id;
```

2. **显示内连接**

```sql
-- 语法
select 列名 from 从表 [inner] join 主表 on 从表.外键 = 主表.主键

-- 例子
select *
from emp
         inner join dept on emp.dept_id = dept.id;
```

### 外连接查询
1. **左外连接**

> 左表中所有的记录都出现在结果中，如果右表没有匹配的记录，使用 null 填充
>

```sql
-- 语法
select 列名 from 左表 left join 右表 on 从表.外键 = 主表.主键

-- 例子
select d.NAME, e.id, e.NAME, e.gender, e.salary
from dept d
         left join emp e on d.id = e.dept_id;
```

2. **右外连接**

> 右表中所有的记录都出现在结果中，如果左表没有对应的记录，使用 null 填充
>

```sql
-- 语法
select 列名 from 左表 right join 右表 on 从表.外键 = 主表.主键

-- 例子
select e.id, e.NAME, e.gender, e.salary, d.NAME
from dept d
         right join emp e on d.id = e.dept_id;
```

### 自连接查询
> 一张表自己连接自己，一般用于查询表中的数据有关联的情况
>

```sql
-- 语法
select 字段列表 from 表名 别名1, 表名 别名2 where 别名1.字段 = 别名2.字段;

-- 例子
-- 查询每个员工的姓名以及他的领导的姓名
select e1.NAME, e2.NAME '领导'
from emp e1,
     emp e2
where e1.leader_id = e2.id;
```

### 子查询
> 子查询就是将一个查询的结果做为另一个查询的条件
>

+ 形成查询语句的嵌套，嵌套的 SQL 查询就是子查询，**<font style="color:#DF2A3F;">子查询语句需要使用括号括起来</font>**

#### 单行单列
> 如果子查询是单行单列，父查询使用比较运算符：`**>**` `**<**` `**=**`
>

```sql
-- 例子
-- 查询工资最高的员工信息
select *
from emp
where salary = (select max(salary) from emp);
```

#### 多行单列
> 如果子查询是多行单列，可以认为是一个数组，父查询使用 `**in**`、`**any**`、`**all**` 关键字
>

| 关键字 | 说明 |
| :---: | --- |
| in | 查询包含在 in 条件中的所有数据 |
| all | 可以与 >、< 结合起来使用，分别表示大于、小于其中的**所有数据**时条件为真 |
| any | 可以与 >、< 结合起来使用，分别表示大于、小于其中的**任意一个数据**时条件为真 |


```sql
-- 例子
-- 查询工资大于 5000 的部门信息
select *
from dept
where id in (select dept_id from emp where salary > 5000);
```

#### 多行多列
> 如果子查询是多行多列，子查询可以认为它是一张虚拟表，可以使用表连接再次进行多表查询
>

+ **注意：**如果要访问子查询表的字段，需要为子查询表取别名，否则无法访问表中的字段

```sql
-- 例子
-- 查询2011年以后入职的员工及其对应的部门信息
select tempTable.*, dept.name
from (select *
      from emp
      where year(join_date) >= 2011) tempTable
         left join dept on tempTable.dept_id = dept.id;
```

## 事务
> 数据库的**<font style="color:#DF2A3F;">事务</font>**（Transaction）是一种机制、一个操作序列，包含了**<font style="color:#DF2A3F;">一组数据库操作命令</font>**
>

> 简单理解：如果一个包含多个步骤的业务操作，被事务管理，要么这些操作同时操作成功，要么同时失败
>

> 事务是一个不可分割的工作逻辑单元
>

### 事务的基本使用
1. **MySQL 中两种事务的操作方式**
    1. 手动提交事务：先开启，再提交
    2. 自动提交事务（默认的）：在执行一条sql语句时自动开启及提交一次事务
2. **手动提交事务SQL语句**

```sql
-- 开启事务
start transaction;

-- 提交事务
commit;

-- 回滚事务
rollback;
```

### 事务原理
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1706174206895-73b50ae0-6f86-4b64-8cda-817f2ea27bbd.png)

1. 客户端连接 mysql 服务，服务端会对这个用户进行安全校验，通过后会创建一个临时的事务日志文件
2. 当用户直接向数据库插入数据时（因为 mysql 默认事务自动提交），数据会直接刷入数据库
3. 当用户调用 `**start transaction**` 命令手动开启事务时，事务相关的数据首先会写入这个临时的事务日志文件，然后当用户调用 commit 命令时，会将事务的数据刷入到数据库
4. 当用户进行事务的回滚时，会直接清空这个临时的事务日志文件
5. 当一个事务尚未提交，但是连接中断时，自动清空这个临时的事务文件

### 事务四大特性
> 数据库的事务必须具备ACID特性，ACID是指 Atomicity（原子性）、Consistency（一致性）、Lsolation（隔离性）和 Durability（持久性）的英文缩写。
>

1. **隔离性（Lsolation）**

多个用户并发的访问数据库时，一个用户的事务不能被其他用户的事物干扰，多个并发的事务之间要相互隔离。

2. **持久性（Durability）**

当事务提交或回滚后，数据库会持久化的保存数据

3. **原子性（Atomicity）**

原子是不可分割的最小操作单位，事务要么同时成功，要么同时失败

4. **一致性（Consistency）**

事务操作前后，数据总量不变

### 事务隔离级别
> 事务在操作时的理想状态：多个事务之间互不影响，如果隔离级别设置不当就可能引发并发访问问题
>

| 级别 | 名字 | 隔离级别 | 脏读 | 不可重复读 | 幻读 | 数据库默认隔离级别 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 读未提交 | read uncommitted | 是 | 是 | 是 | |
| 2 | 读已提交 | read committed | 否 | 是 | 是 | Oracle 和 SQL Server |
| 3 | 可重复读 | repeatable read | 否 | 否 | 是 | MySQL |
| 4 | 串行化 | serializable | 否 | 否 | 否 | |


**并发访问的三个问题：**

1. **脏读：**一个事务读取到了另一个事务中尙未提交的数据
2. **不可重复读：**一个事务中多次读取时数据是不一致的，这是事务 update 时引发的问题
3. **幻读（虚读）：**一个事务内读取到了别的事务插入或者删除的数据，导致前后读取记录行数不同。

## 函数
### 日期函数
```sql
-- # 1. now 当前日期和时间
select now();

-- # 2. curdate 当前日期
select curdate();

-- # 3. curtime 当前时间
select curtime();

-- # 4. year 年份
select year(now());

-- # 5. month 月份
select month(now());

-- # 6. dayofmonth 月份中的第几天
select dayofmonth(now());

-- # 7. dayofweek 星期中的第几天
select dayofweek(now());

-- # 8. dayofyear 年份中的第几天
select dayofyear(now());

-- # 9. weekday 星期几
select weekday(now());

-- # 10. hour 小时
select hour(now());

-- # 11. minute 分钟
select minute(now());

-- # 12. second 秒
select second(now());

-- # 13. date_format 日期格式化
select date_format(now(), '%Y-%m-%d %H:%i:%s');
```

### 判断函数 - case when
```sql
-- 语法
-- case 条件表达式
--     when 条件1 then 结果1
--     when 条件2 then 结果2
--     when 条件3 then 结果3
--     else 结果4
-- end

-- 例子
select id,
       name,
       case sex
           when 1 then '男'
           when 2 then '女'
           else '保密' end '性别'
from user;
```

### 字符函数
```sql
-- # 1. concat 字符串拼接
select concat('hello', 'world');

-- # 2. length 字符串长度
select length('hello');

-- # 3. upper 字符串转大写
select upper('hello');

-- # 4. lower 字符串转小写
select lower('HELLO');

-- # 5. left 截取字符串左边的几个字符
select left('hello', 3);

-- # 6. right 截取字符串右边的几个字符
select right('hello', 3);

-- # 7. substr 截取字符串的子串
select substr('hello', 2, 3);

-- # 8. instr 查找字符串在另一个字符串中第一次出现的位置
select instr('hello', 'l');

-- # 9. trim 去除字符串两边的空格
select trim(' hello ');

-- # 10. ltrim 去除字符串左边的空格
select ltrim(' hello ');

-- # 11. rtrim 去除字符串右边的空格
select rtrim(' hello ');

-- # 12. replace 替换字符串
select replace('hello', 'l', 'w');
```

### 数学函数
```sql
-- # 1. round 四舍五入
select round(3.1415926, 2);

-- # 2. ceil 向上取整
select ceil(3.1415926);

-- # 3. floor 向下取整
select floor(3.1415926);

-- # 4. rand 随机数
select rand();

-- # 5. abs 绝对值
select abs(-1);

-- # 6. truncate 截断
select truncate(3.1415926, 2);

-- # 7. mod 取余
select mod(10, 3);

-- # 8. pow 幂运算
select pow(2, 3);

-- # 9. sqrt 开平方
select sqrt(4);
```

### 流程控制函数
```sql
-- # 1. ifnull 判断是否为null
select ifnull(null, '空');

-- # 2. if 判断
select if(1 > 2, '大于', '小于');

-- # 3. case when then else end 判断
select case when 1 > 2 then '大于' else '小于' end;

-- # 4. nullif 判断是否为null
select nullif(1, 1);

-- # 5. coalesce 判断是否为null
select coalesce(null, '空');

-- # 6. greatest 比较大小
select greatest(1, 2, 3);

-- # 7. least 比较大小
select least(1, 2, 3);
```

### 聚合函数
+ **<font style="color:#DF2A3F;">注意：null 值不参与所有聚合函数运算</font>**

```sql
-- # 1. count 计数
select count(*) from emp;

-- # 2. max 最大值
select max(salary) from emp;

-- # 3. min 最小值
select min(salary) from emp;

-- # 4. sum 求和
select sum(salary) from emp;

-- # 5. avg 平均值
select avg(salary) from emp;

-- # 6. group_concat 字符串拼接
select group_concat(name) from emp;
```

## MySQL性能
### 索引
> MySQL 官方对索引的定义为：索引（index）是帮助 MySQL 高效获取数据的数据结构。
>

+ **本质：**索引就是数据结构（B+Tree）
+ **主键（约束）索引：**主键约束（唯一+非空） + 提高查询效率
+ **唯一（约束）索引：**唯一约束 + 提高查询效率
+ **普通索引：**仅提高查询效率
+ **组合（联合）索引：**多个字段组合索引（联合主键索引、联合唯一索引、联合普通索引）
+ **全文索引 TEXT BIGTEXY：**MySQL 全文索引使用较少，基本针对文档类数据会选择 solr、es等文档搜索类数据库
+ **hash 索引：**根据 key-value 等值查询效率非常高，但是不适合范围查询

### MySQL索引语法
#### 创建索引
+ **注意：**
    1. 如果在同一张表中创建多个索引，要保证索引名不能重复
    2. 主键索引 primary key 无法通过此方式进行创建

```sql
-- 创建普通索引
create index 索引名 on 表名(字段)

-- 创建唯一索引
create unique index 索引名 on 表名(字段)

-- 创建普通组合索引
create index 索引名 on 表名(字段1, 字段2, ...)

-- 创建唯一组合索引
create unique index 索引名 on 表名(字段1, 字段2, ...)
```

#### 在已有表的字段上修改表时指定
```sql
-- 添加一个主键，这意味着索引值必须是唯一的，且不能为null
alter table 表名 add primary key(字段); -- 默认索引名：primary

-- 添加唯一索引（除了null外，null可能会出现多次）
alter table 表名 add unique(字段); -- 默认索引名：字段名

-- 添加普通索引，索引值可以出现多次
alter table 表名 add index(字段); -- 默认索引名：字段名
```

#### 创建表时指定
```sql
-- 创建学生表
create table student
(
    id        int primary key auto_increment, -- 主键索引
    name      varchar(20),
    age       int,
    score     int,
    telephone varchar(20) unique,             -- 唯一索引
    index name_index (name)                     -- 普通索引
); 
```

### 索引的数据结构
> B+Tree将树分为**叶子节点**和**非叶子节点**，其中非叶子节点只存储索引+指针，不存储数据，而叶子节点存储索引+数据
>

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1706344324578-9902c69a-a782-44d7-bf90-91464acf49fc.png)

+ **说明：**
    1. MySQL数据库每个节点**16KB**，对于非叶子节点，每个节点存储元素的数量 n=16*1024/(8+6) ≈ 1170，当非叶子节点高度为2时，存储的元素个数N1=1170<sup>2 </sup> ≈ 130W；（索引占8字节，指针占6字节）
    2. 叶子节点存储索引+数据，如果B+Tree高度为3，那么2层非叶子节点和三层叶子节点，存储节点数大致为 N2=1770<sup>2</sup> *15 ≈ 2000W
    3. B+Tree为了提高数据库的区间访问能力，针对叶子节点维护了一个类似双向链表的结构，避免数据反复从根节点搜索带来的性能开销
+ **B+Tree好处**
    1. B+Tree 的非叶子节点只存储索引和指域，不保存数据，这样降低数的高度，也就意味着减少了数据查询所需的io次数
    2. 叶子节点按照索引排好序，更好的支持范围查找，速度会很快（使用了双向链表）
    3. MySQL将**根节点都加载到内存中**，每张表有一个根节点，**大小是16KB**，那么这样的好处，按照上述结果是千万条数据，那么只有2次磁盘IO，这就是为什么我们加完索引之后能瞬间查到数据的原因



