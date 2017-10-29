import React from 'react';

/**
 * stateless component
 */

const Task = (props) => {
    return (
    <div style={{"display":props.show}} className="task-choose">
        <input type="checkbox" onClick={props.chooseClick} checked={props.status === "complete" ? "checked" : ""}/>
        {props.status === "complete" ? <s className="task-name" onClick={props.chooseClick}>{props.content}</s> : ""}
        {props.status === "active" ? <span className="task-name" onClick={props.chooseClick}>{props.content}</span> : ""}
        <span className="close-button" onClick={props.removeClick}>&times;</span>
    </div>
    )
}

const Button = (props) => {
    return <button className="task-button" onClick={props.onClick}>{props.buttonName}</button>
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
            <input onKeyUp={props.handleTaskName} type="text" className="task-input" placeholder={props.placeholder} id={props.id}/>
             {taskCountDom}
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
        document.onkeyup = (e) => {
            if (e.keyCode === 13) {
                e.srcElement.value = "";// 清空输入框
                let taskName = this.state.taskName;
                if (taskName !== "") {
                    let taskData = this.state.taskData;
                    taskData.push({"content":taskName,"status":"active","show":true});
                    this.setState({
                        taskData:taskData,
                        taskName:"",
                    });
                }
            }
        }
    }
    render () {
        const handleTaskName = (event) => {// 处理input数据
            let taskName = event.target.value;
            this.setState({
                taskName:taskName,
            });
        }
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

        const showTaskByFilter = (statusFilter) => {// 按条件筛选显示的任务
            console.log(statusFilter);
            console.log("into");
            let taskData = this.state.taskData;
            taskData.map((item) => {
                if (statusFilter.indexOf(item.status) > -1) {
                    item.show = "block";
                } else {
                    item.show = "none";
                }
                return item;
            });
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
        <div className="task-container">
            <h2>todoMVC</h2>
            <InputComponent handleTaskName={handleTaskName} taskName={this.state.taskName} placeholder="What needs to be done?" id="task-input" taskData={this.state.taskData}/>
            <div className="task-choose-list">{taskDomList}</div>
            <div>
                <Button buttonName="All" onClick={() => {showTaskByFilter("active,complete")}}/>
                <Button buttonName="Active" onClick={() => {showTaskByFilter("active")}}/>
                <Button buttonName="Complete" onClick={() => {showTaskByFilter("complete")}}/>
            </div>
        </div>
        )
    }
}

export default TaskComponent;