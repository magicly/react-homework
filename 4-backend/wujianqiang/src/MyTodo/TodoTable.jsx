import React, { Component } from 'react';
import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";
import TaskList from "./TaskList";
import { Link } from 'react-router-dom';

const Outer = styled.div`
    width:600px;
    margin:auto;
    @media (max-width: 750px) {
        width: 100%;
    }
`

const Section = styled.section`
    background: #fff;
    margin: 130px Auto;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
    h1{ 
        position: absolute;
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

const Bottom = styled.div`
    margin: 60px Auto;
    color: #bfbfbf;
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
    font-size: 18px;
    width:100px;
    height:30px;
    text-align: center;
    :hover{
        cursor:pointer;
    }
`

class TodoTable extends Component {
    constructor(props) {
        super(props);
        this.taskId = 0;
        this.state = {
            list: [],
            showWay: props.showWay,
            addName: "",
            chooseAll: false,
            outCheck: false,
            username:localStorage.getItem("username"),
        }
        document.onkeydown = this.keyDownSearch;
    }

    componentDidMount() {
        this.getTaskList();
        let date = new Date();
        this.taskId = date.getTime();
    }

    keyDownSearch = () => {
        let eve = window.event;
        if (eve.keyCode === 13) {
            this.setState({ chooseAll: false });
            this.addTask();
        }
    }

    getTaskList = () =>{
        fetch('http://cloudapi.yoloke.com/rest/todo/get-todos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userId":"wujianqiang"}),
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log("查询结果：",result);
            this.setState({
                list: JSON.parse(result.data.todos[0].todosJson),
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    updateNew = (taskList) =>{
        fetch('http://cloudapi.yoloke.com/rest/todo/set-todos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userId":"wujianqiang","todosJson":JSON.stringify(taskList)}),
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            if(!result.data.isSuccess){
                alert("储存失败，请稍后重试")
            }else{
                this.setState({ list:taskList });
                console.log("更新结果：",result)
            }
        })
        .catch(error => {
            console.log(error);
            alert("储存失败，请稍后重试"+error)
        });
    }

    addTask = () => {
        let taskList = this.state.list;
        let taskName = this.state.addName;
        this.setState({ addName: "" })
        if ("" === taskName) {
            return;
        }
        this.taskId = this.taskId + 1;
        let newTask = { taskId: this.taskId, isCompleted: false, name: taskName };
        taskList.push(newTask);
        this.updateNew(taskList);
    }

    check = (taskId, taskList) => {
        for (let task of taskList) {
            if (task.taskId === taskId) {
                task.isCompleted = !task.isCompleted;
                break;
            }
        };
        let completed = taskList.filter(item => !item.isCompleted);
        if (completed.length === 0) {
            this.setState({
                chooseAll: true
            });
        } else {
            this.setState({
                chooseAll: false
            });
        }
        this.updateNew(taskList);
    }

    deleteTask = (taskId, taskList) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].taskId === taskId) {
                taskList.splice(i, 1);
                break;
            }
        };
        this.updateNew(taskList);
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
            chooseAll: false
        });
        this.updateNew(arrNew);
    }

    checkAdd = (e) => {
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
        this.updateNew(taskList);
    }

    changeAddValue = (e) => {
        let name = e.target.value;
        this.setState({ addName: name });
    }
    
    render() {
        return (
            <Outer>
                <Section>
                    <Header value={this.state.addName} changeAddValue={this.changeAddValue} />
                    {
                        this.state.list.length === 0 ? null :
                            <div>
                                <InputAll checked={this.state.chooseAll} type="checkbox" onChange={this.checkAdd} onClick={this.chooseAll}/>
                                <TaskList taskList={this.state.list} check={this.check} showWay={this.state.showWay} deleteTask={this.deleteTask} />
                                <Footer taskList={this.state.list} showWay={this.state.showWay}  clearCompleted={this.clearCompleted} check={this.check} deleteTask={this.deleteTask}/>
                            </div>
                    }
                </Section>
                <Bottom>
                    <h2>User:  {this.state.username}</h2>
                    <Link to="/logout"><OutBtn>logout</OutBtn></Link>
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </Bottom>
            </Outer>
        );
    }
}

const TodoAll = () =>{
    return <TodoTable showWay={1}/>
}

const TodoActive = () =>{
    return <TodoTable showWay={2}/>
}

const TodoCompleted = () =>{
    return <TodoTable showWay={3}/>
}

export {TodoAll ,TodoActive ,TodoCompleted} ;
