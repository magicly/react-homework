import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Outer = styled.div`
    width:900px;
`

const Move = keyframes`
    from{top:-600px}
    to{top:0px}
`

const Color = keyframes`
    from{color:#f5f5f5}
    to{clolr:#EAD7D7}
`

const SectionT = styled.section`
    background: #fff;
    margin: 130px 10px 40px 360px;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
    animation: ${Move} 0.5s ;
    h1{ 
        position: absolute;
        animation: ${Color} 5s ;
        top: -224px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        text-rendering: optimizeLegibility;
    }
`

const HeaderSimple = ({ className, value, changeAddValue }) => {
    return (
        <header className={className}>
            <h1>todos</h1>
            <input placeholder="What needs to be done?" value={value} onChange={changeAddValue} />
        </header>
    );
}

const Header = styled(HeaderSimple) `
    margin-top: 10px;
    input{
        padding: 16px 16px 16px 60px;
        border:0;
        outline:none;
        font-size: 24px;
        width: 454px;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
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
`
const TaskliSimple = ({ className, idex, item, tasks, check, deleteTask }) => {
    return (
        <li key={"task_" + idex} id={item.name} className={className}>
            <div key={"div_" + idex} >
                <input key={"chooseTask_" + idex} type="checkbox" onChange={() => check(item.taskId, tasks)} checked={item.isCompleted} />
                <label key={"label_" + idex} >{item.name}</label>
                <button key={"button_" + idex} onClick={() => deleteTask(item.taskId, tasks)}></button>
            </div>
        </li>
    )
}

const Taskli = styled(TaskliSimple) `
    position: relative;
    font-size: 24px;
    border-bottom: 2px solid #ededed;
    :last-child {
        border-bottom: none;
    }
    :hover button{
        display: block;
    }
    input{
        text-align: center;
        height: auto;
        position: absolute;
        bottom: 3px;
        margin: auto 0;
        border:0;
        outline:none;
        appearance: none;
    }
    input:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }
    input:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
    label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
        color: ${
            props => props.item.isCompleted ? '#d9d9d9' : ''
        };
        text-decoration: ${
            props => props.item.isCompleted ? 'line-through' : ''
        }
        
    }
    button{
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        border:0;
        outline:none;
        background: none;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }
    button:hover {
        color: #af5b5e;
    }
    button:after {
        content: '×';
    }
    
`

const TaskListSimple = ({ className, tasks, check, showWay, deleteTask }) => {
    return (
        <ul className={className}>
            {tasks.map((item, i) => {
                if (showWay === 1) {//All
                    return (
                        <Taskli key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} />
                    );
                } else if (showWay === 2) {//Active
                    return (
                        !item.isCompleted ? <Taskli key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} /> : null
                    );
                } else {//Completed
                    return (
                        item.isCompleted ? <Taskli key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} /> : null
                    );
                }
            })
            }
        </ul>

    );
};

const TaskList = styled(TaskListSimple) `
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 0;
`
const A = styled.a`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color:${
        props => props.active === 1 ? 'rgba(175, 47, 47, 0.2)' : ''
    };
    :hover {
        border-color: rgba(175, 47, 47, 0.1);
        cursor:pointer;
    }
    :active {
        border-color: rgba(175, 47, 47, 0.2);
    }
`
const FooterSimple = ({ className, tasks, showWay, showList, clearCompleted }) => {
    const active = tasks.filter(item => !item.isCompleted);
    const clearCompletedButton = active.length < tasks.length
        ? <button onClick={() => clearCompleted()}>Clear completed</button>
        : null;
    return (
        <footer className={className}>
            <span>
                <strong>{active.length} {active.length === 1 ? "item left" : "items left"}</strong>
            </span>
            <ul>
                <li><A active={showWay === 1 ? 1 : 0} onClick={() => showList(1)}>All</A></li>
                <li><A active={showWay === 2 ? 1 : 0} onClick={() => showList(2)}>Active</A></li>
                <li><A active={showWay === 3 ? 1 : 0} onClick={() => showList(3)}>Completed</A></li>
            </ul>
            {clearCompletedButton}
        </footer>
    );
};

const Footer = styled(FooterSimple) `
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    :before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
    span{
        float: left;
        text-align: left;
    }
    span strong {
        font-weight: 300;
    }
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }
    li {
        display: inline;
    }
    button,button:active{
        float: right;
        font-size: 14px;
        position: relative;
        text-decoration: none;
        background: none;
        cursor: pointer;
        position: relative;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        font-family: inherit;
        color: inherit;
    }
    button:hover {
        text-decoration: underline;
    }
`
const InputAll = styled.input`
    position: absolute;
    top: 10px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border:0;
    outline:none;
    background: none;
    transform: rotate(90deg);
    appearance: none;
    :before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }
    :checked:before {
        color: #737373;
    }

`
const BottomDIV = styled.div`
    margin: 60px 0px 0px 40%;
    color: #bfbfbf;
    animation: ${Color} 5s ;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
    p{
        line-height: 1;
    }
    a{
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }
    a:hover {
        text-decoration: underline;
    }
`

class Todo extends Component {
    constructor() {
        super();
        this.taskId = 0;
        this.state = {
            list: [],//任务列表
            showWay: 1,//任务分类显示状态：1全部2未完成3已完成
            addName: "",//添加任务输入框
            chooseAll: false,//全选
        }
        document.onkeydown = this.keyDownSearch;
    }

    //监听键盘回车键
    keyDownSearch = () => {
        let eve = window.event;
        if (eve.keyCode === 13) {
            this.setState({ chooseAll: false });
            this.addTask();
        }
    }

    //添加新任务
    addTask = () => {
        let arr = this.state.list;
        let taskName = this.state.addName;
        this.setState({ addName: "" })
        if ("" === taskName) {
            return;
        }
        let newTask = { taskId: this.taskId, isCompleted: false, name: taskName };
        this.taskId = this.taskId + 1;
        arr.push(newTask);
        this.setState({ list: arr });
    }

    //选择框操作
    check = (taskId, tasks) => {
        for (let task of tasks) {
            if (task.taskId === taskId) {
                task.isCompleted = !task.isCompleted;
                break;
            }
        };
        //判断是否全部完成
        let completed = tasks.filter(item => !item.isCompleted);
        if (completed.length === 0) {
            this.setState({
                list: tasks,
                chooseAll: true,
            });
        } else {
            this.setState({
                list: tasks,
                chooseAll: false,
            });
        }
    }

    //删除一个任务
    deleteTask = (taskId, tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskId === taskId) {
                tasks.splice(i, 1);
                break;
            }
        };
        this.setState({ list: tasks });
    }

    //删除已完成任务
    clearCompleted = () => {
        let arr = this.state.list;
        let arrNew = [];
        for (let newTask of arr) {
            if (!newTask.isCompleted) {
                arrNew.push(newTask);
            }
        }
        this.setState({
            chooseAll: false,
            list: arrNew,
        });
    }

    //分类显示任务
    showList = (showWay) => {
        this.setState({ showWay: showWay });
    }

    //全选按钮
    chooseAll = (e) => {
        let isChecked = e.target.checked;
        let arr = this.state.list;
        for (let task of arr) {
            task.isCompleted = isChecked;
        }
        this.setState({
            list: arr,
            chooseAll: isChecked,
        });
    }

    changeAddValue = (e) => {
        let name = e.target.value;
        this.setState({ addName: name });
    }

    render() {
        return (
            <Outer>
                <SectionT>
                    <Header value={this.state.addName} changeAddValue={this.changeAddValue} />
                    {
                        this.state.list.length === 0 ? null :
                            <div>
                                <InputAll checked={this.state.chooseAll} type="checkbox" onChange={this.chooseAll} />
                                <TaskList tasks={this.state.list} check={this.check} showWay={this.state.showWay} deleteTask={this.deleteTask} />
                                <Footer tasks={this.state.list} showWay={this.state.showWay} showList={this.showList} clearCompleted={this.clearCompleted} />
                            </div>
                    }
                </SectionT>
                <BottomDIV>
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </BottomDIV>
            </Outer>
        );
    }
}

export default Todo;
