import React from 'react';

/**
 * stateless component
 */

const Task = (props) => {// Task组件
    return (
    <div style={{"display":props.show}} className="task-choose">
        <input type="checkbox" onClick={props.chooseClick} checked={props.status === "complete" ? "checked" : ""}/>
        {props.status === "complete" ? <s className="task-name" onClick={props.chooseClick}>{props.content}</s> : ""}
        {props.status === "active" ? <span className="task-name" onClick={props.chooseClick}>{props.content}</span> : ""}
        <span className="close-button" onClick={props.removeClick}>&times;</span>
    </div>
    )
}

const Button = (props) => {// 按钮组件
    return <button className="task-button" onClick={props.clickFunction}>{props.buttonName}</button>
}

const ButtonGroup = (props) => {// 底部按钮组件
    return (
        <div>
            <Button buttonName="All" clickFunction={props.showAll}/>
            <Button buttonName="Active" clickFunction={props.showActive}/>
            <Button buttonName="Complete" clickFunction={props.showComplete}/>
        </div>
    )
}

const InputComponent = (props) => {
    let taskData = props.taskData;
    let taskCount = taskData.filter((e) => {
        return e.status === "active";
    }).length;
    let taskCountDom = "";
    if (taskCount > 0) {
        taskCountDom = <span>Task remaind : {taskCount}</span>
    }
    return (
        <div>
            <input type="text" className="task-input" placeHolder={props.placeHolder} id={props.id}/>{taskCountDom}
        </div>
    )
}

/**
 * statefull component
 */

class TaskComponent extends React.Component {// 任务列表
    constructor(props){
        super(props);
        let taskData = [/*{"content":"example1","status":"active","show":"block"},{"content":"example2","status":"active","show":"none"}*/];
        this.state = {
            taskData:taskData,
        }
        // 回车事件
        document.onkeydown = (e) => {
            if (e.keyCode === 13) {
                let taskName = document.getElementById("task-input").value;
                if (taskName !== "") {
                    let taskData = this.state.taskData;
                    console.log(taskName);
                    taskData.push({"content":taskName,"status":"active","show":true});
                    this.setState({
                        taskData:taskData,
                    });
                    document.getElementById("task-input").value = "";
                }
            }
        }
    }
    render () {
        const removeTask = (i) => {// 删除事项功能
            let taskData = this.state.taskData;
            taskData.splice(i, 1);
            this.setState({
                taskData:taskData
            });
        }
        const chooseTask = (i) => {// 任务勾选事件
            let taskData = this.state.taskData;
            let item = taskData[i];
            item.status = item.status === "complete" ? "active" : "complete";
            taskData[i] = item;
            this.setState({
                taskData:taskData
            });
        }
        const showAll = () => {// 显示所有事项
            let taskData = this.state.taskData;
            for (let item of taskData) {
                item.show = "block";
            }
            this.setState({
                taskData:taskData
            });
        }

        const showActive = () => {// 显示正在活动的事项
            let taskData = this.state.taskData;
            for (let item of taskData) {
                item.show = item.status === "complete" ? "none" : "block";
            }
            this.setState({
                taskData:taskData
            });
        }

        const showComplete = () => {// 显示已经完成的事项
            let taskData = this.state.taskData;
            for (let item of taskData) {
                item.show = item.status === "active" ? "none" : "block";
            }
            this.setState({
                taskData:taskData
            });
        }
        let taskData = this.state.taskData;
        let taskDomList = [];
        if (taskData !== undefined) {
            for (let i in taskData) {
                taskDomList.push(<Task key={i} status={taskData[i].status} content={taskData[i].content} show={taskData[i].show} removeClick={removeTask.bind(this,i)} chooseClick={chooseTask.bind(this,i)} />);
            }
        }
        taskDomList.reverse();
        return (
        <div>
            <p>todoMVC</p>
            <InputComponent placeHolder="What needs to be done?" id="task-input" taskData={this.state.taskData}/>
            <div className="task-choose-list">{taskDomList}</div>
            <div><ButtonGroup showAll={showAll} showActive={showActive} showComplete={showComplete}/></div>
        </div>
        )
    }
}

class TotalContainer extends React.Component {// 总组件
    render () {
        return (
            <div className="task-container">
                <TaskComponent/>
            </div>
        )
    }
}

export default TotalContainer;