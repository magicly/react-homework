import React from 'react';
import TaskHtmlStyled from './TaskHtmlStyled';

class TaskComponent extends React.Component {
    constructor (props) {
        super(props);
        let taskList = localStorage.getItem("taskList");
        if (taskList !== "" && taskList !== null) {
            taskList = JSON.parse(taskList);
        } else {
            taskList = [];
        }
        let buttonStatus = localStorage.getItem("buttonStatus");
        if (buttonStatus !== "" || buttonStatus !== null) {
            buttonStatus = "All";
        }
        this.state = {
            taskInput:"",
            taskList:taskList,
            buttonStatus:buttonStatus,
        }
    }

    getTimestamp = () => {// 用作每条任务的id
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

    setLocalStorage = (taskList,buttonStatus) => {// 存储到web存储，为了刷新页面数据不丢失
        localStorage.setItem("taskList",JSON.stringify(taskList));
        if (buttonStatus !== null) {
            localStorage.setItem("buttonStatus", buttonStatus);
        }
    }

    taskInputKeyUp = (e) => {
        let taskInput = e.target.value;
        this.setState({
            taskInput:taskInput
        });
        if (e.keyCode === 13) {// 回车添加任务
            if (taskInput !== "") {
                let taskList = this.state.taskList;
                taskList.unshift({
                    "id":this.getTimestamp(),
                    "title":taskInput,
                    "complete":false,
                    "show":true,
                    "editing":false,
                });
                taskList = this.taskShowSetting(taskList);
                e.target.value = "";// 清空输入框
                this.setState({
                    taskList:taskList
                });
                this.setLocalStorage(taskList, null);
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
        this.setLocalStorage(taskList, buttonStatus);
    }

    removeTask = (e) => {
        let taskId = e.target.value;
        let taskList = this.state.taskList.filter((item) => {
            return item.id !== taskId;
        });
        this.setState({
            taskList:taskList,
        });
        this.setLocalStorage(taskList, null);
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
        this.setLocalStorage(taskList, null);
    }

    showTaskByGroup = (e) => {
        let buttonStatus = e.target.name;
        let taskList = this.state.taskList.map((item) => {
            if (buttonStatus === "All") {
                item.show = true;
            } else if (buttonStatus === "Active") {
                item.show = !item.completed;
            } else if (buttonStatus === "Completed") {
                item.show = item.completed;
            }
            return item;
        });
        this.setState({
            taskList:taskList,
            buttonStatus:buttonStatus,
        });
        this.setLocalStorage(taskList, buttonStatus);
    }

    clearCompleted = () => {
        let taskList = this.state.taskList.filter((item) => {
            return !item.completed;
        });
        this.setState({
            taskList:taskList,
        });
        this.setLocalStorage(taskList, null);
    }

    toggleModifyModel = (taskId, show) => {
        let taskList = this.state.taskList.map((item) => {
            if (item.id === taskId) {
                item.editing = show;
            }
            return item;
        });
        this.setState({
            taskList:taskList,
        });
        this.setLocalStorage(taskList, null);
    }

    modifyTaskTitle = (taskId, taskTitle) => {
        let taskList = this.state.taskList;
        if (taskTitle === "" || taskTitle === null) {
            taskList.filter((item) => {
                return taskId !== item.id;
            });
        } else {
            taskList.map((item) => {
                if (taskId === item.id) {
                    item.title = taskTitle;
                }
                return item;
            });
        }
        this.setState({
            taskList:taskList,
        });
    }

    intoModify = (e) => {
        console.log(e);
        let taskId = e.target.htmlFor;
        this.toggleModifyModel(taskId, true);
    }

    quitModify = (e) => {
        let taskTitle = e.target.value;
        let taskId = e.target.id;
        this.modifyTaskTitle(taskId, taskTitle);
        this.toggleModifyModel(taskId, false);
    }

    modifyTaskKeyUp = (e) => {
        if (e.keyCode === 13) {
            let taskTitle = e.target.value;
            let taskId = e.target.id;
            this.modifyTaskTitle(taskId, taskTitle);
            this.toggleModifyModel(taskId, false);
        }
    }

    render () {
        return <TaskHtmlStyled
         taskInputKeyUp={this.taskInputKeyUp}
         taskList={this.state.taskList}
         toggleTask={this.toggleTask}
         removeTask={this.removeTask}
         completeAllTask={this.completeAllTask}
         showTaskByGroup={this.showTaskByGroup}
         buttonStatus={this.state.buttonStatus}
         clearCompleted={this.clearCompleted}
         intoModify={this.intoModify}
         quitModify={this.quitModify}
         modifyTaskKeyUp={this.modifyTaskKeyUp}
         />
    }
}
export default TaskComponent;