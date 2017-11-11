import React from 'react';
import styled from 'styled-components';
const Heardh1 = styled.h1`
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
`
const Heardinput = styled.input`
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;    
    ::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    ::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    ::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
`
const FormInputControl = ({ handlerAdd }) => {
    return (
        <header>
            <Heardh1>Todos</Heardh1>
            <Heardinput type="text" placeholder="What needs to be done?" onKeyDown={handlerAdd} />
        </header>
    );
}
export default FormInputControl;
