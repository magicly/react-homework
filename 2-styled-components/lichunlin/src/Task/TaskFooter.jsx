import React from 'react';
import styled from 'styled-components';

const TaskFooter = ({
    className,
    taskList,
    clearCompleted,
    showTaskByGroup,
    buttonStatus,
}) => {
    return (
        <footer className={className}>
            {taskList.length <= 0 ? null : 
                <div>
                    <span className="todo-count">
                        <strong>
                        {
                            taskList.reduce((count, task) => {
                                return count + (task.completed ? 0 : 1);
                            }, 0)
                        }
                        </strong>
                        <span> item left</span>
                    </span>
                    <ul className="filters">
                        <li>
                            <a name="All" onClick={showTaskByGroup} className={buttonStatus === "All" ? "selected" : ""}>All</a>
                        </li>
                        <span> </span>
                        <li >
                            <a name="Active" onClick={showTaskByGroup}  className={buttonStatus === "Active" ? "selected" : ""}>Active</a>
                        </li>
                        <span> </span>
                        <li>
                            <a name="Completed" onClick={showTaskByGroup}  className={buttonStatus === "Completed" ? "selected" : ""}>Completed</a>
                        </li>
                    </ul>
                    <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
                </div>
            }
        </footer>
    )
}

const TaskFooterStyled = styled(TaskFooter)`
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

    @media (max-width: 640px) {
        height: 100px;
    }

    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a.selected,
    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
        cursor: pointer;
    }

    .filters li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    @media (max-width: 430px) {
        height: 50px;

        .filters {
            bottom: 10px;
        }
    }

    .clear-completed, .clear-completed:active {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
        position: relative;
    }

    .clear-completed:hover {
        text-decoration: underline;
    }

    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }
`

export default TaskFooterStyled;