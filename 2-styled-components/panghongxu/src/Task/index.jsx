import React from 'react';
import TaskHtmlStyled from './TaskCss';

class TaskComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            taskInput:"",
            taskList:[],
            buttonStatus:"All",
        }
    }

    getTimestamp = () => {
        return new Date().getTime() + "";
    }

    taskShowSetting = (taskList) => {// 按状态设置任务是否显示
        let buttonStatus = this.state.buttonStatus;
        taskList.map((item) => {
            if (buttonStatus === "All") {
                item.show = true;
            } else if (buttonStatus === "Active") {
                item.show = !item.completed;
            } else if (buttonStatus === "Completed") {
                item.show = item.completed;
            }
            return item;
        });
        return taskList;
    }

    taskInputKeyUp = (e) => {
        let taskInput = e.target.value;
        this.setState({
            taskInput:taskInput
        });
        if (e.keyCode === 13) {// 回车添加任务
            if (taskInput !== "") {
                let taskList = this.state.taskList;
                taskList.push({"id":this.getTimestamp(),"title":taskInput,"complete":false,"show":true});
                taskList = this.taskShowSetting(taskList);
                e.target.value = "";// 清空输入框
                this.setState({
                    taskList:taskList
                });
            }
        }
    }

    toggleTask = (e) => {
        let buttonStatus = this.state.buttonStatus;
        let taskId = e.target.value;
        let taskList = this.state.taskList.map((item) => {
            if (item.id === taskId) {
                item.completed = !item.completed;
            }
            return item;
        });
        taskList = this.taskShowSetting(taskList);
        this.setState({
            taskList:taskList,
        });
    }

    taskStatusChange = () => {

    }

    removeTask = (e) => {
        let taskId = e.target.value;
        let taskList = this.state.taskList.filter((item) => {
            return item.id !== taskId;
        });
        this.setState({
            taskList:taskList,
        });
    }

    completeAllTask = (e) => {
        let taskList = this.state.taskList.map((item) => {
            item.completed = e.target.checked;
            return item;
        });
        taskList = this.taskShowSetting(taskList);
        this.setState({
            taskList:taskList,
        });
    }

    showTaskByGroup = (e) => {
        let operation = e.target.name;
        let taskList = this.state.taskList.map((item) => {
            if (operation === "All") {
                item.show = true;
            } else if (operation === "Active") {
                item.show = !item.completed;
            } else if (operation === "Completed") {
                item.show = item.completed;
            }
            return item;
        });
        this.setState({
            taskList:taskList,
            buttonStatus:e.target.name,
        });
    }

    clearCompleted = () => {
        let taskList = this.state.taskList.filter((item) => {
            return !item.completed;
        });
        this.setState({
            taskList:taskList,
        });
    }

    render () {
        return <TaskHtmlStyled
         taskInputKeyUp={this.taskInputKeyUp}
         taskList={this.state.taskList}
         toggleTask={this.toggleTask}
         taskStatusChange={this.taskStatusChange}
         removeTask={this.removeTask}
         completeAllTask={this.completeAllTask}
         showTaskByGroup={this.showTaskByGroup}
         buttonStatus={this.state.buttonStatus}
         clearCompleted={this.clearCompleted}
         />
    }
}
    


export default TaskComponent;
