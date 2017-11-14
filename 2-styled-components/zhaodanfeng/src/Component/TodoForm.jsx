import React from 'react';
import styled from 'styled-components';

const TodoappH1 = styled.h1`
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
    :matches(article, aside, nav, section) {
        font-size: 1.5em;
        -webkit-margin-before: 0.83em;
        -webkit-margin-after: 0.83em;
    }
`
const NameSpan = styled.span`
    font-size: 14px;
    color: black;
`
const TodoInput = styled.input`
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    font-smoothing: antialiased;
`
const ToggleAll = styled.input`
    transform: rotate(90deg);
    appearance: none;
    outline: none;
    position: absolute;
    top: 15px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
    background: none;
    :before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }
    :checked:before {
        color: #737373;
    }
`

function TodoForm(props) {
    return (
        <header>
            <TodoappH1>todos <NameSpan>by zhaodanfeng</NameSpan></TodoappH1>
            <TodoInput type="text" placeholder="少年，你要做甚？" onKeyDown={props.handleInputDone}/>
            <ToggleAll type="checkbox" onChange={props.handleAllCheckChange} />
        </header>
    );
}

export default TodoForm;