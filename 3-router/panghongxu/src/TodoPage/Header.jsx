import React from 'react';
import styled from "styled-components";

const HeaderComponent = ({
	className,
	todoList,
	keyDownSearch,
	valueListener,
	inputValue,
	addTodoWords
}) => {
    return (
		<header>
        	<h1>todos</h1>
			<InputWord type="text" 
				onKeyDown={keyDownSearch} 
				onChange={valueListener} value={inputValue} 
				placeholder="What needs to be done?">
			</InputWord>
        	<AddButton onClick={addTodoWords}>+</AddButton>
		</header>
    );
}

const Header = styled(HeaderComponent)`
	display: block;
	:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 550px) {
		input{
			width:50%;
		}
	}

	@media (max-width: 550px) {
		input{
			width:50%;
		}
	}
`
const InputWord = styled.input`
	display:inline;
	width:80%;
	outline: none;
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
	font: 24px Arial;
	cursor: auto;
	.edit {
		position: relative;
		margin: 0;
		font-size: 44px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		outline: none;
		color: inherit;
		box-sizing: border-box;
	}
`
const AddButton = styled.button`
	outline:none;
	display:inline;
	color: tomato;
	float:right;
	height:100%;
	width:6%;
	line-height:60px;  
	border-radius: 2px;
	background-color:#e8e8e8;  
	cursor: pointer;
	position: relative;
	left:0px;
	top:0px;
`

export default Header;