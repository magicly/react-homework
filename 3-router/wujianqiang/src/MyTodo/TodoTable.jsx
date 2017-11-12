import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";
import TaskList from "./TaskList";
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';



const Outer = styled.div`
    width:900px;
    @media (max-width: 750px) {
        width: 100%;
    }
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
    margin: 130px Auto;
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
    @media (max-width: 750px) {
        width: 100%;
        margin: 10px 0 0 0;
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
    margin: 60px Auto;
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
    @media (max-width: 750px) {
        margin: 0;
    }
`
const OutBtn = styled.button`
    padding:3px 20px;
    background-color:#28a3ef;
    border:1px solid #1299ec;
    border-radius:5px;
    color:#ffffff;
    display: inline-block;
    padding: 2px 14px;
    box-sizing: border-box;
    margin-bottom: 0;
    font-size: 12px;
    width:100px;
    height:30px;
    text-align: center;
`

class TodoTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = 0;
        this.state = {
            list: JSON.parse(localStorage.getItem("tasklist"))==null?[]:JSON.parse(localStorage.getItem("tasklist")),//任务列表
            showWay: 1,
            addName: "",
            chooseAll: false,
            outCheck: false,
        }
        document.onkeydown = this.keyDownSearch;
       
    }

    keyDownSearch = () => {
        let eve = window.event;
        if (eve.keyCode === 13) {
            this.setState({ chooseAll: false });
            this.addTask();
        }
    }

    addTask = () => {
        let taskList = this.state.list;
        let taskName = this.state.addName;
        this.setState({ addName: "" })
        if ("" === taskName) {
            return;
        }
        let newTask = { taskId: this.taskId, isCompleted: false, name: taskName };
        this.taskId = this.taskId + 1;
        taskList.push(newTask);
        this.setState({ list: taskList });
        localStorage.setItem("tasklist",JSON.stringify(taskList));
    }

    check = (taskId, tasks) => {
        for (let task of tasks) {
            if (task.taskId === taskId) {
                task.isCompleted = !task.isCompleted;
                break;
            }
        };
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
        localStorage.setItem("tasklist",JSON.stringify(tasks));
    }

    deleteTask = (taskId, tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskId === taskId) {
                tasks.splice(i, 1);
                break;
            }
        };
        this.setState({ list: tasks });
        localStorage.setItem("tasklist",JSON.stringify(tasks));
    }

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
        localStorage.setItem("tasklist",JSON.stringify(arrNew));
    }

    showList = (showWay) => {
        this.setState({ showWay: showWay });
        localStorage.setItem("showWay",showWay);
    }

    checkAdd = (e) => {
        console.log(e)
        this.setState({
            outCheck:e.target.value.length>0,
        });
    }

    chooseAll = (e) => {
        let isChecked = e.target.checked;
        let taskList = this.state.list;
        for (let task of taskList) {
            task.isCompleted = isChecked;
        }
        this.setState({
            list: taskList,
            chooseAll: isChecked,
            outCheck:e.target.value.length>0,
        });
        localStorage.setItem("tasklist",JSON.stringify(taskList));
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
                                <InputAll checked={this.state.chooseAll} type="checkbox" onChange={this.checkAdd} onClick={this.chooseAll}/>
                                <TaskList tasks={this.state.list} check={this.check} showWay={this.state.showWay} deleteTask={this.deleteTask} />
                                <Footer tasks={this.state.list} showWay={this.state.showWay} showList={this.showList} clearCompleted={this.clearCompleted} check={this.check} deleteTask={this.deleteTask}/>
                            </div>
                    }
                </SectionT>
                <BottomDIV>
                    <Router>
                    <div><OutBtn><Link to="/logout">logout</Link></OutBtn></div>
                    </Router>
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </BottomDIV>
            </Outer>
        );
    }
}

export default TodoTable;
