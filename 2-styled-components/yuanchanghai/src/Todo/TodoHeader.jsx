import React from 'react';
import styled from 'styled-components';
//头部样式
const Input = styled.input`
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
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`
const StyledCheckbox = styled.input`
    outline: none;
    position: absolute;
    z-index: 99;
    top: 20px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
    :before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
    }
    :checked:before {
      color: #737373;
    }
`;
//Todo头部
const TodoHeader = (props) =>{
    return (
        <header>
            <h1>Todo任务</h1>
            <StyledCheckbox onClick={props.allTodo} type="checkbox" />
            <Input onKeyUp={props.handleKeyUp}  placeholder="输入内容" />
        </header>
    )
};
export default TodoHeader;
