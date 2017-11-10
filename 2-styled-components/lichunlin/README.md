# 项目结构
1.所有业务代码都在Task文件夹中

2.index.jsx -- statefull组件，引入TaskContainer.jsx中的静态组件

3.TaskContainer.jsx -- 无状态组件的总组件包含以下无状态组件

> * Header.jsx -- todos头部，一个输入框和todos标题显示
>
> * TaskList.jsx -- 任务列表
>
> * TaskFooter.jsx -- 任务组件底部操作按钮组
>
> * WebsiteFooter.jsx -- 网站静态的footer

# 实现功能
* 添加任务
* 完成任务
* 删除任务
* 按分组筛选显示的任务
* 清空已完成任务
* 一键完成所有任务
* 支持刷新或关闭页面后数据不丢失
* 支持修改任务名字功能

# 使用说明
* 使用命令行进入项目根路径（这里是lichunlin这个目录）
* 执行命令**npm install**安装npm依赖
* 执行命令**npm start**启动项目
* 如果没有弹出浏览器可以手动打开浏览器输入地址[http://localhost:3000](http://localhost:3000)