# 作业内容
在第二次的作业基础上，实现路由功能，包括：
* All, Activated, Completed三个标签页对应三个不同的URL
* 在前端模拟登录， 在未登录状态下访问任何页面跳转到登录页面
* 登录页面可以输入用户名和密码，提交登录
* 所有数据信息存放在localStorage里，刷新页面需要保持状态（包括任务数据和登录状态）
* 用户可以登出

# 作业要求
* **必须用react router**
* 代码格式化，变量命名有意义，目录文件划分结构清晰
* 不允许出现var
* 不允许直接操作DOM结构，包括使用jQuery, document.getElementById, document.querySeletor等
* 不允许单独使用CSS文件， 样式必须使用Styled Components
* 用到的小图标请在http://iconfont.cn/ 上找

# 评分标准
* 有详细的README.md文件说明
* 功能是否完整
* 代码清晰易懂
* UI仿真性越高越好
* 上传无关文件扣分
* 尽量多地使用ES6特性，有加分
* 没有errors, 没有warnings
* 支持手机端有加分

# 截止日期
* 2017-11-12 20:00
* 以此时间点之前发起的pull request有效， 之后**commit的代码评分的时候不计算在内。** 
* 此时间点之前没有发起pull request，算本次作业未提交

# 提交方式
* fork本repo
* 在`3-router`目录下以自己名字拼音建立目录，在目录里面提交完整代码
* 发起`pull request`