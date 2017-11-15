import React from 'react';
import styled from 'styled-components';

const TaskListRowSimple = ({ className, item, taskList, check, deleteTask }) => {
    return (
        <li id={item.taskId} className={className}>
            <div>
                <input type="checkbox" onChange={() => check(item.taskId, taskList)} checked={item.isCompleted} />
                <label>{item.name}</label>
                <button onClick={() => deleteTask(item.taskId, taskList)}></button>
            </div>
        </li>
    )
}

const TaskListSimple = ({ className, taskList, check, showWay, deleteTask }) => {
    return (
        <ul className={className}>
            {taskList.map((item, i) => {
                if (showWay === 1) {//All
                    return <TaskListRow key={"li_" + item.taskId} item={item} taskList={taskList} check={check} deleteTask={deleteTask} />
                } else if (showWay === 2) {//Active
                    return !item.isCompleted ? <TaskListRow key={"li_" + item.taskId} item={item} taskList={taskList} check={check} deleteTask={deleteTask} /> : null
                } else {//Completed
                    return item.isCompleted ? <TaskListRow key={"li_" + item.taskId} item={item} taskList={taskList} check={check} deleteTask={deleteTask} /> : null
                }
            })}
        </ul>
    );
};

const TaskListRow = styled(TaskListRowSimple) `
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

const TaskList = styled(TaskListSimple) `
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 0;
`

export default TaskList;