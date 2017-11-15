import React, { Component } from 'react';
import TodoPage from '../TodoPage/TodoPage';


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
        let bottonStatus = (props.status === "" || props.status === undefined) ? "all" : props.status;
        this.state = {
            todoList:[],
            inputValue: "",//输入的值
            bottonStatus: bottonStatus,//按钮状态
        }
    }
    componentDidMount(){
        this.getTodoList();
    }
    //判重复 修改时不与当前修改项(id)判断
    isNotRepet(value,List,id){
        for (let item of List) {
            if(item.content === value && item.id !==id){
                return false;
            }
        }
        return true;
    }
    //增加todo
    putListUtil = (value) =>{
        let todoList = this.state.todoList;
        if(!(this.isNotRepet(value,todoList,null))){
            alert("亲，已有该名称，请重新输入！");
        }else{
            todoList.unshift({ "content": value, "status": "active", editor: false, "id":GenNonDuplicateID()});
            this.setTodoList(todoList,this.state.checkAll);
            this.setState({
                inputValue: "",
            });
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
    }
    //隐藏修改
    hideUpdateEvent = (e) => {
        let content = e.target.value;
        let id = e.target.id;
        let todoList = this.state.todoList;
        this.hideEditor(id);
        this.updateTodoValue(id,content,todoList);
    }
    //修改活动内容
    updateWords = (e) => {
        if(e.keyCode === 13){
            let content = e.target.value;
            let id = e.target.id;
            let todoList = this.state.todoList;
            this.hideEditor(id);
            this.updateTodoValue(id,content,todoList);
        }
    }
    //隐藏修改状态
    hideEditor = (todoId) => {
        let todoList = this.state.todoList;
        todoList.map((todo) => {
            if (todo.id === todoId) {
                todo.editor = false;
            }
            return todo;
        });
        this.setState({
            todoList:todoList,
        });
    }
    //修改活动内容
    updateTodoValue = (id,content,todoList) => {
        let bool = this.isNotRepet(content,todoList,id);
        if(bool){
            for (let item of todoList) {
                if(item.id === id){
                    item.content = content;
                    break;
                }
            }
            this.setTodoList(todoList,this.state.checkAll);
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
        this.setTodoList(todoList,bool);
    }
   
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        let bottonStatus = todoList.length < 1 ? "all" : this.state.bottonStatus;
        this.setState({
            bottonStatus: bottonStatus,
        });
        this.setTodoList(todoList,this.state.checkAll);
    }
    //删除任务
    deleteList = (index) => {
        let todoList = this.state.todoList;
        todoList.splice(index,1);
        let bottonStatus = todoList.length < 1 ? "all" : this.state.bottonStatus;
        this.setState({
            bottonStatus: bottonStatus,
        });
        this.setTodoList(todoList,this.state.checkAll);
    }
    // 任务勾选事件 
    chooseList = (index) => {
        let todoList = this.state.todoList;
        todoList[index].status = todoList[index].status === 'active' ? 'complete' : 'active';
        this.setTodoList(todoList,this.state.checkAll);
    }
    //后台数据保存
    setTodoList = (todoList,bool) => {
        fetch('http://cloudapi.yoloke.com/rest/todo/set-todos.json',{
            method:"POST",
            body:JSON.stringify(
                {
                    "userId":"panghx",
                    "todosJson":JSON.stringify(todoList)
                }
            ),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if(json.data.isSuccess){
                console.log("设置成功",json);
            }
        });
        this.setState({
            todoList:todoList,
            checkAll: bool,
        });
    }

    //请求后台数据
    getTodoList = () => {
        let checkAll = false;
        let todoList = [];

        let setData = (param) =>{
            this.setState({
                todoList:param.todoList,
                checkAll:param.checkAll,
            });
        };

        fetch('http://cloudapi.yoloke.com/rest/todo/get-todos.json',{
            method:"POST",
            body:JSON.stringify({"userId":"panghx"}),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log("get-todos",json.data.todos[0].todosJson);
            if(json.data.isSuccess){
                todoList = JSON.parse(json.data.todos[0].todosJson);
                if (todoList.length>0) {
                    checkAll = todoList.length === todoList.filter(item => item.status === "complete").length;
                    setData({
                        todoList:todoList,
                        checkAll:checkAll,
                    });
                }
            }
        });
        
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
                showUpdateEvent={this.showUpdateEvent}
                updateWords={this.updateWords}
                hideUpdateEvent={this.hideUpdateEvent}
            />
        );
    }
}


export default TodoContainer;
