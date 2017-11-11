import React from 'react';
import styled from 'styled-components';
import TaskListDo from "./TaskListDo";


const TaskListSimple = (props) => {
    console.log("location",props.location)
    //console.log(location.state.tasksList,typeof(location.state.tasksList))
    return (
        
        <ul >
            123
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