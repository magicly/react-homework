import React from 'react';
import styled from 'styled-components';

const TaskList = ({
    className,
    taskList,
    completeAllTask,
    toggleTask,
    intoModify,
    removeTask,
    quitModify,
    modifyTaskKeyUp,
}) => {
    return (
        <section className={className}>
            {taskList.length > 0 ? <input onChange={completeAllTask} className="toggle-all" type="checkbox" /> : null}
            <ul>
                {taskList.map((task) => {
                    return (
                    !task.show ? null :
                    <li key={task.id} className={(task.completed ? "completed" : "") + (task.editing ? " editing" : "")}>
                        <div className="view">
                            <input value={task.id} readOnly="true" onClick={toggleTask} className="toggle" type="checkbox" checked={task.completed ? "checked" : false}/>
                            <label htmlFor={task.id} onDoubleClick={intoModify}>{task.title}</label>
                            <button value={task.id} onClick={removeTask} className="destroy"></button>
                        </div>
                        <input onBlur={quitModify} id={task.id} onChange={modifyTaskKeyUp} onKeyUp={modifyTaskKeyUp} className="edit" defaultValue={task.title}/>
                    </li>)
                })}
            </ul>
        </section>
    );
}

const TaskListStyled = styled(TaskList)`
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;

    label[for='toggle-all'] {
        display: none;
    }

    .toggle-all {
        position: absolute;
        top: -55px;
        left: -12px;
        width: 60px;
        height: 34px;
        text-align: center;
        border: none; /* Mobile Safari */
    }

    .toggle-all:before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked:before {
        color: #737373;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
        text-align: left;
    }

    ul li:last-child {
        border-bottom: none;
    }

    ul li.editing {
        border-bottom: none;
        padding: 0;
    }

    ul li.editing .edit {
        display: block;
        width: 506px;
        padding: 13px 17px 12px 17px;
        margin: 0 0 0 43px;
    }

    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    ul li.editing .view {
        display: none;
    }

    ul li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    ul li .toggle:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    ul li .toggle:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    ul li label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    ul li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    ul li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    ul li .destroy:hover {
        color: #af5b5e;
    }

    ul li .destroy:after {
        content: '×';
    }

    ul li:hover .destroy {
        display: block;
    }

    ul li .edit {
        display: none;
    }

    ul li .editing:last-child {
        margin-bottom: -1px;
    }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .toggle-all,
        .todo-list li .toggle {
            background: none;
        }

        .todo-list li .toggle {
            height: 40px;
        }

        .toggle-all {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            -webkit-appearance: none;
            appearance: none;
        }
    }
`

export default TaskListStyled;