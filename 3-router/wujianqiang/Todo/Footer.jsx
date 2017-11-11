import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';


const LinkStyled = styled(Link)`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color:${
        props => props.active === 1 ? 'rgba(175, 47, 47, 0.2)' : ''
    };
    :hover {
        border-color: rgba(175, 47, 47, 0.1);
        cursor:pointer;
    }
    :active {
        border-color: rgba(175, 47, 47, 0.2);
    }
`

const FooterSimple = ({ className, tasks, showWay, showList, clearCompleted,check ,deleteTask }) => {
    
    const activeTask = tasks.filter(item => !item.isCompleted);
    const completedTask = tasks.filter(item => item.isCompleted);
    console.log("tasks:",tasks)
    console.log("active:",activeTask)
    console.log("completed:",completedTask)
    const clearCompletedButton = activeTask.length < tasks.length
        ? <button onClick={() => clearCompleted()}>Clear completed</button>
        : null;
    return (
        <Router>
        <footer className={className}>
            <span>
                <strong>{activeTask.length} {activeTask.length === 1 ? "item left" : "items left"}</strong>
            </span>
            <ul>
                <li><LinkStyled to={{
                                    pathname: "/All",
                                    state: {showType:1,tasksList:tasks}
                                    }} >All
                    </LinkStyled>
                </li>
                <li><LinkStyled to={{
                                    pathname: "/Active",
                                    state: {showType:2,tasksList:activeTask}
                                    }}>Active
                    </LinkStyled>
                </li>
                <li><LinkStyled to={{
                                    pathname:"/Completed",
                                    state: {showType:3,tasksList:completedTask}
                                    }}>Completed
                    </LinkStyled>
                </li>
            </ul>
            {clearCompletedButton}
        </footer>
        </Router>
    );
};

const Footer = styled(FooterSimple) `
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
                    0 8px 0 -3px tas#f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
    span{
        float: left;
        text-align: left;
    }
    span strong {
        font-weight: 300;
    }
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }
    li {
        display: inline;
    }
    button,button:active{
        float: right;
        font-size: 14px;
        position: relative;
        text-decoration: none;
        background: none;
        cursor: pointer;
        position: relative;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        font-family: inherit;
        color: inherit;
    }
    button:hover {
        text-decoration: underline;
    }
`

export default Footer;