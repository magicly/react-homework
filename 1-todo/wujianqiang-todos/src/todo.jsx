import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './todo.css';

const TaskList = ({dataSource,check,status,deleteTask}) => {
    return (
        <div className="taskList">
            <ul className="todo-list">
                {dataSource.map((item,i) => {
                    if(status === 1){//显示全部任务
                        return (
                            <li key={"task_"+i} id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input key={"chooseTask_"+i} className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label>{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                        );
                    }else if(status === 2){//显示未完成任务
                        return (
                            !item.isCompleted
                            ?
                            <li key={"task_"+i} id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input key={"chooseTask_"+i} className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label>{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                            :
                            null
                        );
                    }else{//显示已完成任务
                        return (
                            item.isCompleted
                            ?
                            <li key={"task_"+i} id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input key={"chooseTask_"+i} className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label >{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                            :
                            null
                        );
                    }
                })
                }
            </ul>
        </div>
    );
};

const Footer = ({dataSource,showWay,showList,clearCompleted}) => {
    const active = dataSource.filter(item => !item.isCompleted);
    const clearCompletedButton = active.length < dataSource.length
        ? <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
        : null;
    return(
        <footer className="footer">
            <span className="todo-count">
                <strong>{active.length} {active.length === 1 ? "item left" : "items left"}</strong>
            </span>
            <ul className="filters">
                <li><a className={showWay === 1?"selected":null} onClick={() => showList(1)}>All</a></li>
                <span> </span>
                <li><a className={showWay === 2?"selected":null} onClick={() => showList(2)}>Active</a></li>
                <span> </span>
                <li><a className={showWay === 3?"selected":null} onClick={() => showList(3)}>Completed</a></li>
            </ul>
            {clearCompletedButton}
        </footer>
    );
};

class Todo extends Component {
    constructor(){
        super();
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
        if(eve.keyCode === 13){
            this.setState({chooseAll:false});//新添加后，全选按钮恢复
            this.addTask();
        }
    }

    //添加新任务
    addTask = () => {
        let arr = this.state.list;
        let nameTask = this.state.addName;//获取输入框的值
        this.setState({addName:""})//清空输入框的值
        if("" === nameTask){
            return ;
        }

        let has = arr.filter(item => nameTask === item.name);
        if(has.length>0){
            alert("该同名任务已经存在！");
                return;
        }

        let newTask = {isCompleted:false,name:nameTask};
        arr.push(newTask);
        this.setState({list:arr});
    }

    //选择框操作
    check = (name,dataSource) => {
        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i].name === name){
                dataSource[i].isCompleted = !dataSource[i].isCompleted;
                break;
            }
        };
        this.setState({list:dataSource});
    }

    //删除一个任务
    deleteTask = (name,dataSource) => {
        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i].name === name){
                dataSource.splice(i, 1);
                break;
            }
        };
        this.setState({list:dataSource});
    }

    //删除已完成任务
    clearCompleted = () => {
        let arr = this.state.list;
        let arrNew = [];
        for(let i = 0; i < arr.length; i++) {
            if(!arr[i].isCompleted){
                arrNew.push(arr[i]);//未完成的就添加到新数组，然后setState新数组到原list
            }
        }
        this.setState({
            chooseAll:false,//删除全部任务后，全选按钮恢复
            list:arrNew,
        });
    }

    //分类显示任务
    showList = (showWay) => {
        //1、显示全部
        //2、显示未完成
        //3、显示已完成
        this.setState({showWay:showWay});
    }

    //全选按钮
    chooseAll = (e) => {
        let isChecked = e.target.checked;
        let arr = this.state.list;

        for(let i = 0; i < arr.length; i++) {
            arr[i].isCompleted = isChecked;
        }
        this.setState({
            list:arr,
            chooseAll:isChecked,
        });
    }

    changeAddValue = (e) => {
        let name = e.target.value;
        this.setState({addName:name});//获取输入框的值
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wu Jianqiang</h1>
                </header>
                <div className="todos">
                    <header className="header">
                        <input id="chooseAll" checked={this.state.chooseAll} className="toggle-all" type="checkbox" onClick={this.chooseAll} onChange={this.chooseAll}/>
                        <span>全选</span>
                        <input id="input" className="new-todo" value={this.state.addName} placeholder="What needs to be done?" onChange={this.changeAddValue}/>
                    </header>

                    <TaskList dataSource={this.state.list} check={this.check} status={this.state.showWay} deleteTask={this.deleteTask} />

                    <Footer dataSource={this.state.list} showWay={this.state.showWay} showList={this.showList} clearCompleted={this.clearCompleted} />
                </div>

            </div>
        );
     }
}

export default Todo;
