## README 启动说明

###### 1、clone代码到本地用你自己的ide打开目录，这时候的目录里面没有node_modoules文件，需要下载一个 npm install

###### 命令行 npm install  下载较慢，可以使用淘宝(或其他)镜像下载
######                      命令：npm install --registry=https://registry.npm.taobao.org 
######                      或安装nrm（npm install -g nrm ; nrm use taobao 切换镜像;nrm ls 查看）
###### 2、下载styled-components包  在项目目录中 命令：npm install --save styled-components

###### 3、下载modoules成功，会看到对应的node_modules目录，添加styled-components依赖成功，会在package.json有对应的配置 
######    启动项目 npm start