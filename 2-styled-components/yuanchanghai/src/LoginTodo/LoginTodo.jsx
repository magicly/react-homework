import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
injectGlobal`
    html,body {
      margin: auto;
      padding: 0;
      font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.4em;
      background: #f5f5f5;
      color: #4d4d4d;
      min-width: 230px;
      max-width: 550px;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      font-smoothing: antialiased;
      font-weight: 300;
    }
`;
//登录样式
const Login = styled.div`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
    h1{
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
    input::-webkit-input-placeholder,input::-moz-placeholder,input::input-placeholder{
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    input{
    }
`;
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
class LoginTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:"",
            password:"",
        }
    }
    //输入框的键盘监听 //添加TodoTask
    handleKeyUp = (event) => {
        const valOne = event.target.value;
        const val = valOne.replace(/(^\s+)|(\s+$)/g,"");
        if( event.keyCode ===13 ){
            if(!val){
                return false;
            }
        }else{
        }
    };
    render() {
        return (
            <Login>
                <header>
                    <h1>Todo任务</h1>
                    <Input onKeyUp={this.handleKeyUp}  placeholder="输入内容" />
                    <Input onKeyUp={this.handleKeyUp}  placeholder="输入内容" />
                </header>
            </Login>
        )
    }
}
export default LoginTodo;
