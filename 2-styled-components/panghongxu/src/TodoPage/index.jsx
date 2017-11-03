import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import './index.css';

//静态页面 由新增组件 列表组件 按钮组件
const TodoPage = (props) => {
    return (
        <div className="todoapp">
            <h1>todos</h1>
            
            <header className="header">
                <input type="text" onChange={props.valueListener} value={props.inputValue} placeholder="What needs to be done?" className="new-todo" />
                <button onClick={props.addTodoWords} className="addbutton">ADD</button>
            </header>
            <div className="main">
                <input className="toggle-all" type="checkbox" onClick={props.checkedAll} />
                <ShowListNew data={props.todoList} deleteList={props.deleteList} chooseList={props.chooseList} />
            </div>
            <ButtonGroup
                showAll={props.showAll}
                active={props.active}
                complete={props.complete}
                notCompleteCount={props.notCompleteCount}
                clearComplete={props.clearComplete}>
            </ButtonGroup>
        </div>
    );
}

//动态渲染
class TodoPageActive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [], //展示的列表[{"content":"example1","status":"active","show":"block"},{"content":"example2","status":"active",                                  "show":"none"}];
            inputValue: "",//输入的值
            notCompleteCount: 0,//未完成的活动
            bool_check: false,//全选标志
            botton_status: 0,
        }
        document.onkeydown = this.keyDownSearch;
    }
    //监听键盘回车键
    keyDownSearch = () => {
        let eve = window.event;
        if (eve.keyCode === 13) {
            this.addTodoWords();
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
        todoList.unshift({ "content": value, "status": "active", "show": true, "id": value + GenNonDuplicateID() });
        this.setState({
            todoList: todoList,
            inputValue: "",
            notCompleteCount: this.state.notCompleteCount + 1,
        });
        //console.log(todoList);
    }
    //全选（取消）
    checkedAll = () => {
        let bool = this.state.bool_check ? false : true;
        let todoList = this.state.todoList;
        let notCompleteCount = !bool ? todoList.length : 0;
        //显示状态
        let bool_show;
        let botton_status = this.state.botton_status;
        if (botton_status === 1) {//active
            bool_show = bool ? "none" : "block";
        } else if (botton_status === 2) {//complete
            bool_show = bool ? "block" : "none";
        } else {//all
            bool_show = "block";
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
            notCompleteCount: notCompleteCount,
            bool_check: bool,
        });
    }
    //显示所有
    showAll = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = "block";
        }
        this.setState({
            todoList: todoList,
            botton_status: 0,
        });
    }
    // 显示未完成
    active = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "complete" ? "none" : "block";
        }
        this.setState({
            todoList: todoList,
            botton_status: 1,
        });
    }
    // 显示已经完成  
    complete = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "active" ? "none" : "block";
        }
        this.setState({
            todoList: todoList,
            botton_status: 2,
        });
    }
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        this.setState({
            todoList: todoList,
        });
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
        this.setState({
            todoList: data,
            notCompleteCount: this.state.notCompleteCount - count,
        });
    }
    // 任务勾选事件 
    chooseList = (id, data) => {
        let count = 1;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                count =  data[i].status === "complete" ? 1 : -1;
                data[i].status = data[i].status === "complete" ? "active" : "complete";
                break;
            }
        };
        this.setState({
            todoList: data,
            notCompleteCount: this.state.notCompleteCount + count,
        });
    }

    render() {
        return (
            <TodoPage
                todoList={this.state.todoList}
                inputValue={this.state.inputValue}
                notCompleteCount={this.state.notCompleteCount}
                botton_status={this.botton_status}

                clearComplete={this.clearComplete}
                checkedAll={this.checkedAll}
                valueListener={this.valueListener}
                addTodoWords={this.addTodoWords}
                showAll={this.showAll}
                active={this.active}
                complete={this.complete}
                deleteList={this.deleteList}
                chooseList={this.chooseList}
            />
        );
    }
}

//列表组件
const ShowListNew = (props) => {
    return (
        <div className="showlist">
            {   
                props.data.map(element1 =>
                    <div key={element1.id} style={{ "display": element1.show }} className="showlist">
                        <input type="checkbox" onClick={() => props.chooseList(element1.id, props.data)} checked={element1.status === "complete" ? "checked" : ""} />
                        {element1.status === "complete" ? <span className="showname-chose" onClick={() => props.chooseList(element1.id, props.data)}>{element1.content}</span> : ""}
                        {element1.status === "active" ? <span className="showname" onClick={() => props.chooseList(element1.id, props.data)}>{element1.content}</span> : ""}
                        <span className="close-button" onClick={() => props.deleteList(element1.id, props.data)}>x</span>
                    </div>
                )
            }
        </div>
    );
}

//生成一个用不重复的ID
const GenNonDuplicateID = () => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substr(3);
    return idStr;
}
//按钮组件
const ButtonGroup = (props) => {
    return (
        <div className="showfooter" >
            <span>{props.notCompleteCount} items left</span>
            <button className="showbutton-f" onClick={() => props.showAll()}>All</button>
            <button className="showbutton" onClick={() => props.active()}>Active</button>
            <button className="showbutton" onClick={() => props.complete()}>Cmpld</button>
            <button className="showbutton" onClick={() => props.clearComplete()}>Clear</button>
        </div>
    );
}

export default TodoPageActive;
