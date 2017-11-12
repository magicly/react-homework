import React from 'react';
import styled from 'styled-components';
import TodoHeader from './TodoHeader.jsx';
import TodoSection from './TodoSection.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
//Todo底部
const TodoFooter = (props) => {
    return (
        <Router>
            <Footer>
                <Span>
                    <strong>{props.count}个未完成任务</strong>
                </Span>
                <FooterUl>
                    <li>
                        <FooterLink state={props.todoState === 1 ? true : false} to="/all" onClick={props.allTodoTask}>全部</FooterLink>
                    </li>
                    <li>
                        <FooterLink state={props.todoState === 2 ? true : false} to="/complete" onClick={props.completeTodoTask}>完成</FooterLink>
                    </li>
                    <li>
                        <FooterLink state={props.todoState === 3 ? true : false} to="/unfinished" onClick={props.unfinishedTodoTask}>未完成</FooterLink>
                    </li>
                </FooterUl>
                <FooterButton completingcount={props.completingcount === 0 ? false : true} onClick={props.completing}>确认完成</FooterButton>
            </Footer>
        </Router>
    );
};
export default TodoFooter;
