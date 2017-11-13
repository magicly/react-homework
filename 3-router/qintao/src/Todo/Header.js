import React  from 'react';
import styled from 'styled-components';
import {
    Link,
  } from 'react-router-dom'
const H1 = styled.h1`

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



const Input = styled.input`


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
    outline: none;
    color: inherit;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;



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


`
const Div = styled.div`
color: #e6e6e6;
float: right;
margin-top: 5px;
a{
    margin:15px;
    color: #4d4d4d;
}
a:link,a:visited{
    text-decoration:none;  /*超链接无下划线*/
   }

`
const Header = (props) => {
	return (
		<header className={props.className}>
			<H1>Todos</H1>
            <Div><Link to='logout'>退出</Link></Div>
			<Input onKeyUp={props.keyup}  />
		</header>
	)
}


export default Header;