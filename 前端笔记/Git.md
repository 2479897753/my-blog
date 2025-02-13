> `Git` 是一个**开源的分布式版本控制系统**，是目前世界上**最先进**、**最流行**的版本控制系统。可以快速高效地处理从很小到非常大的项目版本管理
>

## git 配置
### 配置用户信息
> 通过 `Git` 对项目进行版本管理的时候，`Git` 需要使用这些基本信息，来记录是谁对项目进行了操作：
>

+ **注意：** 如果使用了 `--global` 选项，那么该命令只需要运行一次，即可永久生效

```shell
git config --global user.name "huolushuo"
git config --global user.email "2479897753@qq.com"
git config --global user.password "GIThuo980924shuo"
```

### 检查配置信息
> 除了使用记事本查看全局的配置信息之外，还可以运行如下的终端命令，快速的查看 Git 的全局配置信息：
>

```shell
# 查看所有的配置项
git config --list

# 查看所有全局的配置项
git config --list --global

# 查看指定的全局配置项
git config user.name
git config user.email
git config user.password
```

## git 基本操作
```shell
# 初始化 git 仓库
git init

# 检查当前文件的状态
git status

# 以精简的方式显示文件状态
git status -s 或 git status --short

# 跟踪目录下所有文件并添加到暂存区
git add .

# 将暂存区的文件提交到本地仓库
git commit -m '日志信息'

# 绕过 eslint 检查
git commit -m '修改了bug' --no-verify

# 撤销对文件的修改，还原成 git 仓库中所保存的版本
git checkout -- index.html

# 撤销已放入暂存区的文件
git reset HEAD -- index.html

# 跳过使用暂存区域，将已被跟踪过的文件一并提交，一般不会使用
git commit -a -m '日志信息'

# 从 git 仓库和工作区中同时移除指定文件
git rm -f index.js
```

## git 忽略文件 `.gitignore`
```shell
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

## 查看提交历史
```shell
# 查看所有提交历史，最近的提交在最上面
git log

# 只显示最新的两条提交历史
git log -2

# 以简短的形式显示提交历史
git log --oneline

# 查看命令操作的历史
git reflog
```

## 回退到指定版本
+ **注意：** 如果 `git reset` 后，版本回退了，无法直接 `push` 到远程仓库（因为远程仓库版本是新的），`git push -f` 覆盖推送即可

```shell
# 查看提交历史
git log --oneline

# 根据指定提交的 ID，回退到指定的版本
git reset --hard <commit>
```

## 撤销指定版本的提交
```shell
# 查看提交历史
git log --oneline

# 根据指定的提交版本号，撤销指定提交的版本
git revert -n <commit>

# 需要重新提交
git commit -m '确认撤销a的创建'
```

## git 提交规范
1. **提交类型**
    - `init` - 项目初始化
    - `feat` - 添加新特性
    - `fix` - 修复 bug
    - `docs` - 仅仅修改文档
    - `style` - 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
    - `refactor` - 代码重构，没有加新功能或者修复 bug
    - `perf` - 优化相关，比如提升性能、体验
    - `test` - 增加测试用例
    - `build` - 依赖相关的内容
    - `ci` - ci配置相关，例如对 k8s，docker 的配置文件的修改
    - `chore` - 改变构建流程、或者增加依赖库、工具等
    - `revert` - 回滚到上一个版本
2. **提交描述**
    - **`<Scope>` 修改范围** - 本次修改包含哪些模块
    - **`<Subject>` 概述** - 提交概述，不超过 20 字符
    - **`<Body>` 详情** - 提交详情，可换行显示
    - **`<Footer>` 备注** - 通常是修复 bug 的连接

## git 分支
### 常用分支操作
```shell
# 查看分支列表
git branch

# 基于当前分支，创建一个新的分支
git branch '分支名称'

# 重命名分支
git branch -m '旧名字' '新名字'

# 切换到指定的分支上，如果本地仓库没有该分支，远程仓库有，则会将远程仓库分支拉取到本地
git checkout '分支名称'

# 创建新分支，并切换到新分支上，是上面两个命令的简写
git checkout -b '分支名称'

# 合并分支，需先切换到要合并到的分支
git merge '分支名称'

# 删除本地分支（如果没有删除，那么会报错）
git branch -d '分支名称'

# 删除本地分支（强制删除）
git branch -D '分支名称'
```

### 远程分支操作
```shell
# 给本地仓库关联一个远程仓库地址
git remote add origin <远程仓库地址>

# 修改远程仓库地址
git remote set-url origin <远程仓库地址>

# 查看本地仓库关联的远程仓库地址
git remote -v

# 删除远程仓库的连接
git remote remove origin

# 查看远程仓库列表
git remote show <远程仓库名称>

# 将远程仓库全部克隆在本地仓库上
git clone <远程仓库地址>

# 克隆远程指定分支
git clone -b <远程分支> <远程仓库地址>

# 新建本地分支，并将远程指定分支拉取到新建分支上
git checkout -b <本地分支> <远程仓库名称>/<远程分支>

# 将本地仓库全部推到远程仓库上
git push <远程仓库地址>

# 将本地分支推送到远程指定分支上，并将该远程分支设置为默认推送分支
git push -u origin <远程分支>

# 将本地所在分支推送到默认推送分支
git push

# 将本地所在分支推送到远程指定分支
git push origin <远程分支>

# 拉取远程指定分支到本地所在分支
git pull origin <远程分支>

# 删除远程分支
git push origin --delete  <远程分支>
```

### 如何设置默认推送分支
> 默认推送分支的作用是使用 `git push` 命令就会默认将本地分支按照设置的默认推送分支推送到远程
>

```shell
# 将本地指定分支与远程指定分支关联并设置为默认推送分支
git branch --set-upstream-to=origin/remote_name local_name

# 查看当前配置的默认推送分支
git branch -vv
```

### 如何将本地新建分支推送到远程
```shell
# 新建分支并切换到该分支
git checkout -b <本地分支>

# 将本地分支推送到远程，且远程没有该的分支
git push --set-upstream origin <本地分支>:<远程分支>
```

### 如何合并远程分支
```shell
# 1. 将指定分支 clone 到本地
git clone -b master <远程仓库地址>

# 2. 拉取远程开发分支
git checkout -b dev origin/dev

# 3. 切换到要接受合并的目标分支
git checkout master

# 4. 将指定开发分支合并到目标分支
git merge dev

# 5. 将解决完冲突的文件添加到暂存区
git add .

# 6. 将暂存区的内容提交到本地仓库
git commit -m '将dev分支合并到master分支'

# 将合并结果推送到远程仓库
git push
```

