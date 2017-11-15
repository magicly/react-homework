import React  from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Header from './Header';
import TodoBody from './TodoBody';
import Footer from './Footer';


const TodoPage = (props) => {
    return (
        <div>
            <LogOut>
                <div>当前登录用户: <strong>{localStorage.getItem("userName")}</strong></div>
                <span><LinkStyled to="/logout">退出</LinkStyled></span>
            </LogOut>
            <TodoApp>
                <Header
                    todoList={props.todoList}
                    keyDownSearch={props.keyDownSearch}
                    valueListener={props.valueListener}
                    inputValue={props.inputValue}
                    addTodoWords={props.addTodoWords}>
                </Header>
                <TodoBody
                    bottonStatus={props.bottonStatus}
                    todoList={props.todoList}
                    checkedAll={props.checkedAll}
                    deleteList={props.deleteList}
                    chooseList={props.chooseList}
                    showUpdateEvent={props.showUpdateEvent}
                    hideUpdateEvent={props.hideUpdateEvent}
                    updateWords={props.updateWords}>
                </TodoBody>
                <Footer
                    todoList={props.todoList}
                    bottonStatus={props.bottonStatus}
                    clearComplete={props.clearComplete}>
                </Footer>
            </TodoApp>
        </div>
    );
}
const LinkStyled = styled(Link)`
    color:#13A89E;
    text-decoration: line;
    border-radius: 3px;
    :hover {
        cursor: pointer;
        color:tomato;
    }
`
const LogOut = styled.div`
    z-index:1;
    margin-left:60%;
    div{
        margin-right:15px;
        display:inline;
        height:22px;
        font-size:16px;
        color:rgba(175, 47, 47, 0.45);
        transition:all 0.4s;
    }
    span{
        display:inline;
        margin-left:5px;
    }
`
const TodoApp = styled.div`
    outline: none;
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);

    input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }
`

export default TodoPage;