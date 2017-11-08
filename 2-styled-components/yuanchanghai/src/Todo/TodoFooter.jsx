import React from 'react';
import styled from 'styled-components';
//Todo底部样式
const Footer = styled.footer`
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
`;
const Span = styled.span`
    float: left;
    text-align: left;
    strong {
        font-weight: 300;
    }
`;
const FooterUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
    li{
        display: inline;
    }
`;
const FooterA = styled.a`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: ${props => props.state ? 'rgba(175, 47, 47, 0.1)' : ""};
    :hover {
        border-color: rgba(175, 47, 47, 0.1);
    }
`;
const FooterButton = styled.button`
    float: right;
    outline: none;
    border: 0;
    background: none;
    display:${props => props.completingcount ? 'block' : 'none'};
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
`;
//Todo底部
const TodoFooter = (props) => {
    return (
        <Footer>
            <Span>
                <strong>{props.count}个未完成任务</strong>
            </Span>
            <FooterUl>
                <li>
                    <FooterA state={props.todoState === 1 ? true : false} onClick={props.allTodoTask}>全部</FooterA>
                </li>
                <li>
                    <FooterA state={props.todoState === 2 ? true : false} onClick={props.completeTodoTask}>完成</FooterA>
                </li>
                <li>
                    <FooterA state={props.todoState === 3 ? true : false} onClick={props.unfinishedTodoTask}>未完成</FooterA>
                </li>
            </FooterUl>
            <FooterButton completingcount={props.completingcount === 0 ? false : true} onClick={props.completing}>确认完成</FooterButton>
        </Footer>
    );
};
export default TodoFooter;
