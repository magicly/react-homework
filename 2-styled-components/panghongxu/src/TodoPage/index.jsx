import React, { Component } from 'react';
import styled from "styled-components";
import Header from './Header';
import TodoBody from './TodoBody';
import Footer from './Footer';

const TodoPage = (props) => {
    return (
        <TodoApp>
            <Header
                todoList={props.todoList}
                keyDownSearch={props.keyDownSearch}
                valueListener={props.valueListener}
                inputValue={props.inputValue}
                addTodoWords={props.addTodoWords}>
            </Header>
            <TodoBody 
                todoList={props.todoList}
                checkedAll={props.checkedAll}
                completeCount={props.completeCount}
                deleteList={props.deleteList}
                chooseList={props.chooseList}
                showUpdateEvent={props.showUpdateEvent}
                hideUpdateEvent={props.hideUpdateEvent}
                updateWords={props.updateWords}>
            </TodoBody>
            <Footer
                todoList={props.todoList}
                notCompleteCount={props.notCompleteCount}
                completeCount={props.completeCount}
                botton_status={props.botton_status}
                showAll={props.showAll}
                active={props.active}
                complete={props.complete}
                clearComplete={props.clearComplete}>
            </Footer>
        </TodoApp>
    );
}

//page样式
const TodoApp = styled.div`
    outline: none;
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);

    input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }
`
//生成一个用不重复的ID
const GenNonDuplicateID = () => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substr(3);
    return idStr;
}
//动态渲染
class TodoPageComponent extends Component {
    constructor(props) {
        super(props);

        let todoList = localStorage.getItem("todoList");
        let completeCount = 0;
        let bool_checkAll = false;
        if (todoList !== "" && todoList !== null) {
            todoList = JSON.parse(todoList);
            completeCount = todoList.filter(item => item.status === "complete").length;
            bool_checkAll = todoList.length === todoList.filter(item => item.status === "complete").length;
        } else {
            todoList = [];
        }
        let botton_status = localStorage.getItem("botton_status");
        if (botton_status === "" || botton_status === null) {
            botton_status = "all";
        }
        this.state = {
            todoList: todoList, //展示的列表[{"content":"example1","status":"active","show": true},{"content":"example2","status":"active", "show":false}];
            inputValue: "",//输入的值
            notCompleteCount: todoList.length-completeCount,//未完成的活动
            bool_checkAll: bool_checkAll,//全选标志
            botton_status: botton_status,//按钮状态
            completeCount: completeCount,//已完成活动数目
        }
    }
    // 存储到浏览器， 刷新页面数据不丢失
    setLocalStorage = (todoList,botton_status) => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        if(botton_status !== null) {
            localStorage.setItem("botton_status", botton_status);
        }
    }
    //监听键盘回车键
    keyDownSearch = (event) => {
        if (event.keyCode === 13) {
            let value = event.target.value;
            if (value === undefined || value === '') {
                return;
            }
            //name:名字  state:状态 active:未完成  completed:完成 
            let todoList = this.state.todoList;
            //判断是否显示
            let botton_status = this.state.botton_status;
            let show = true;
            if (botton_status === "complete") {
                show =false;
            }
            todoList.unshift({ "content": value, "status": "active", "show": show,editor:false, "id": value + GenNonDuplicateID() });
            this.setState({
                todoList: todoList,
                inputValue: "",
                notCompleteCount: this.state.notCompleteCount + 1,
                completeCount: this.state.completeCount,
            });
            this.setLocalStorage(todoList,botton_status);
        }
    }
    //监听输入框的值变化
    valueListener = (e) => {
        let value = e.target.value;
        this.setState({
            inputValue: value
        });
    }
    //添加活动
    addTodoWords = () => {
        let value = this.state.inputValue;
        if (value === undefined || value === '') {
            return;
        }
        //name:名字  state:状态 active:未完成  completed:完成 
        let todoList = this.state.todoList;
        //判断是否显示
        let botton_status = this.state.botton_status;
        let show = true;
        if (botton_status === "complete") {
            show =false;
        }
        todoList.unshift({ "content": value, "status": "active", "show": show, "id": value + GenNonDuplicateID() });
        this.setState({
            todoList: todoList,
            inputValue: "",
            notCompleteCount: this.state.notCompleteCount + 1,
            completeCount: this.state.completeCount,
        });
        this.setLocalStorage(todoList,botton_status);
    }
    //显示修改
    showUpdateEvent = (id, data) =>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].editor = true;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //隐藏修改
    hideUpdateEvent = (id, data) =>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].editor = false;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //修改活动内容
    updateWords = (e) =>{
        let content = e.target.value;
        let id = e.target.id;
        let data = this.state.todoList;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].content = content;
                data[i].editor = false;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //全选（取消）
    checkedAll = () => {
        let bool = this.state.bool_checkAll ? false : true;
        let todoList = this.state.todoList;
        let notCompleteCount = !bool ? todoList.length : 0;
        //显示状态
        let bool_show;
        let botton_status = this.state.botton_status;
        if (botton_status === "active") {
            bool_show = bool ? false : true;
        } else if (botton_status === "complete") {
            bool_show = bool ? true : false;
        } else {
            bool_show = true;
        }
        todoList = todoList.map(
            element => ({
                "content": element.content,
                "status": (bool ? "complete" : "active"),
                "show": bool_show,
                "id": element.id,
            })
        );
        this.setState({
            todoList: todoList,
            inputValue: "",
            completeCount: todoList.length - notCompleteCount,
            notCompleteCount: notCompleteCount,
            bool_checkAll: bool,
        });
        this.setLocalStorage(todoList,botton_status);
    }
    //显示所有
    showAll = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "all",
        });
        this.setLocalStorage(todoList,"all");
    }
    // 显示未完成
    active = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "complete" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "active",
        });
        this.setLocalStorage(todoList,"active");
    }
    // 显示已经完成  
    complete = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "active" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "complete",
        });
        this.setLocalStorage(todoList,"complete");
    }
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        let botton_status = todoList.length<1 ? "all" : this.state.botton_status;
        this.setState({
            todoList: todoList,
            completeCount: 0,
            botton_status: botton_status,
        });
        this.setLocalStorage(todoList,botton_status);
    }
    //删除任务
    deleteList = (id, data) => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                if (data[i].status === "active") {
                    count = 1;
                }
                //注意删除要写在统计count记数之后
                data.splice(i, 1);
                break;
            }
        }
        let botton_status = data.length<1 ? "all" : this.state.botton_status;
        this.setState({
            todoList: data,
            completeCount: data.length - (this.state.notCompleteCount - count),//写在前面
            notCompleteCount: this.state.notCompleteCount - count,
            botton_status: botton_status,
        });
        this.setLocalStorage(data,botton_status);
    }
    // 任务勾选事件 
    chooseList = (id, data) => {
        let count = 1;
        let botton_status = this.state.botton_status;

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                //记录完成数
                count = data[i].status === "complete" ? 1 : -1;
                //显示 隐藏
                if (botton_status === "active") {
                    data[i].show = data[i].status === "complete" ? true : false;
                } else if (botton_status === "complete") {
                    data[i].show = data[i].status === "complete" ? false : true;
                } else {
                    data[i].show = true;
                }
                //状态
                data[i].status = data[i].status === "complete" ? "active" : "complete";
                break;
            }
        };
        this.setState({
            todoList: data,
            completeCount: data.length - (this.state.notCompleteCount + count),
            notCompleteCount: this.state.notCompleteCount + count,
        });
        this.setLocalStorage(data,botton_status);
    }

    render() {
        return (
            <TodoPage
                todoList={this.state.todoList}
                inputValue={this.state.inputValue}
                notCompleteCount={this.state.notCompleteCount}
                botton_status={this.state.botton_status}
                completeCount={this.state.completeCount}

                clearComplete={this.clearComplete}
                checkedAll={this.checkedAll}
                valueListener={this.valueListener}
                keyDownSearch={this.keyDownSearch}
                addTodoWords={this.addTodoWords}
                showAll={this.showAll}
                active={this.active}
                complete={this.complete}
                deleteList={this.deleteList}
                chooseList={this.chooseList}
                hideUpdateEvent={this.hideUpdateEvent}
                showUpdateEvent={this.showUpdateEvent}
                updateWords={this.updateWords}
            />
        );
    }
}


export default TodoPageComponent;
