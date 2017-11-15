import React, { Component } from 'react';
import TodoPage from './TodoPage';


//生成一个用不重复的ID
const GenNonDuplicateID = () => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substr(3);
    return idStr;
}
//动态渲染
class TodoContainer extends Component {
    constructor(props) {
        super(props);
        let todoList = localStorage.getItem("todoList");
        let checkAll = false;
        if (todoList !== "" && todoList !== null) {
            todoList = JSON.parse(todoList);
            checkAll = todoList.length === todoList.filter(item => item.status === "complete").length;
        } else {
            todoList = [];
        }

        //链接按钮状态 和 localStorage对比取值
        let pathStatus = props.status;
        let bottonStatus = localStorage.getItem("bottonStatus");
        if (bottonStatus === "" || bottonStatus === null) {
            bottonStatus = "all";
        }
        if (pathStatus !== "undefined") {
            bottonStatus = pathStatus;
        }
        this.setLocalStorage(todoList, bottonStatus);
        this.state = {
            todoList: todoList,
            inputValue: "",//输入的值
            checkAll: checkAll,//全选标志
            bottonStatus: bottonStatus,//按钮状态
            updateValue:"",
        }
    }

    // 存储到浏览器， 刷新页面数据不丢失
    setLocalStorage = (todoList, bottonStatus) => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        localStorage.setItem("bottonStatus", bottonStatus===null?"all":bottonStatus);
    }
    //判重复
    isNotRepet(value,List){
        console.log("isNotRepet",1);
        let bool = true;
        for (let item of List) {
            if(item.content === value){
                bool =false;
                break;
            }
        }
        return bool;
    }
    //增加todo
    putListUtil = (value) =>{
        let todoList = this.state.todoList;
        if(!(this.isNotRepet(value,todoList))){
            alert("亲，已有该名称，请重新输入！");
        }else{
            todoList.unshift({ "content": value, "status": "active", editor: false, "id":GenNonDuplicateID()});
            this.setState({
                todoList: todoList,
                inputValue: "",
            });
            this.setLocalStorage(todoList, this.state.bottonStatus);
        }
    }
    //监听输入活动回车键
    keyDownSearch = (event) => {
        if (event.keyCode === 13) {
            let value = event.target.value;
            if (value === undefined || value === '') {
                return;
            }
            this.putListUtil(value);
        }
    }
    //添加活动
    addTodoWords = () => {
        let value = this.state.inputValue;
        if (value === undefined || value === '') {
            return;
        }
        this.putListUtil(value);
    }
    //监听输入框的值变化
    valueListener = (e) => {
        let value = e.target.value;
        this.setState({
            inputValue: value
        });
    }
    
    //显示修改
    showUpdateEvent = (index) => {
        let todoList = this.state.todoList;
        todoList = todoList.map((item,i) => {
            item.editor = i === index ? true : false;
            return item;
        });
        this.setState({
            todoList: todoList,
        });
        this.setLocalStorage(todoList, this.state.bottonStatus);
    }

    //隐藏修改
    hideUpdateEvent = (e) => {
        let content = e.target.value;
        let id   = e.target.id;
        let todoList = this.state.todoList;
        this.updateTodoValue(id,content,todoList);
    }
    //监听活动内容
    ListenerUpdateValue= (e) => {
        let content = e.target.value;
        this.setState({
            updateValue : content,
        });
    }
    //回车 修改活动内容
    updateWords = (e) => {
        if(e.keyCode === 13){
            let content = e.target.value;
            let id = e.target.id;
            let todoList = this.state.todoList;
            this.updateTodoValue(id,content,todoList);
        }
    }
    //修改活动内容
    updateTodoValue = (id,content,todoList) => {
        if(!(this.isNotRepet(content,todoList))){
            alert("亲,新名称不能与原有名称重名！");
            return;
        }else{
            todoList = todoList.map((item) => {
                item.editor = item.id === id ? false : false;
                item.content = item.id === id ? content : item.content;
                return item;
            });
            this.setState({
                todoList: todoList,
            });
            this.setLocalStorage(todoList, this.state.bottonStatus);
        }
    }
    //全选（取消）
    checkedAll = () => {
        let bool = !this.state.checkAll;
        let todoList = this.state.todoList;
        todoList = todoList.map(
            element => ({
                "content": element.content,
                "status": (bool ? "complete" : "active"),
                editor: false,
                "id": element.id,
            })
        );
        this.setState({
            todoList: todoList,
            checkAll: bool,
        });
        this.setLocalStorage(todoList, this.state.bottonStatus);
    }
   
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        let bottonStatus = todoList.length < 1 ? "all" : this.state.bottonStatus;
        this.setState({
            todoList: todoList,
            bottonStatus: bottonStatus,
        });
        this.setLocalStorage(todoList, bottonStatus);
    }
    //删除任务
    deleteList = (index) => {
        let todoList = this.state.todoList;
        todoList.splice(index,1);
        let bottonStatus = todoList.length < 1 ? "all" : this.state.bottonStatus;
        this.setState({
            todoList: todoList,
            bottonStatus: bottonStatus,
        });
        this.setLocalStorage(todoList, bottonStatus);
    }
    // 任务勾选事件 
    chooseList = (index) => {
        let todoList = this.state.todoList;
        todoList[index].status = todoList[index].status === 'active' ? 'complete' : 'active';
        this.setState({
            todoList: todoList,
        });
        this.setLocalStorage(todoList, this.state.bottonStatus);
    }

    render() {
        return (
            <TodoPage
                todoList={this.state.todoList}
                inputValue={this.state.inputValue}
                bottonStatus={this.state.bottonStatus}
                
                clearComplete={this.clearComplete}
                checkedAll={this.checkedAll}
                valueListener={this.valueListener}
                keyDownSearch={this.keyDownSearch}
                addTodoWords={this.addTodoWords}
                deleteList={this.deleteList}
                chooseList={this.chooseList}
                hideUpdateEvent={this.hideUpdateEvent}
                showUpdateEvent={this.showUpdateEvent}
                updateWords={this.updateWords}
                ListenerUpdateValue={this.ListenerUpdateValue}
            />
        );
    }
}


export default TodoContainer;
