import React from 'react';
import styled from 'styled-components';
import TaskListDo from "./TaskListDo";


const TaskListSimple = ({ className, tasks, check, showWay, deleteTask }) => {
    return (
        <ul className={className}>
            {tasks.map((item, i) => {
                if (showWay === 1) {//All
                    return (
                        <TaskListDo key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} />
                    );
                } else if (showWay === 2) {//Active
                    return (
                        !item.isCompleted ? <TaskListDo key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} /> : null
                    );
                } else {//Completed
                    return (
                        item.isCompleted ? <TaskListDo key={"li_" + i} idex={i} item={item} tasks={tasks} check={check} deleteTask={deleteTask} /> : null
                    );
                }
            })
            }
        </ul>

    );
};

const TaskList = styled(TaskListSimple) `
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 0;
`

export default TaskList;