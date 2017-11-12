import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import Login from '../LoginTodo/LoginTodo.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
//登录样式
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
const LoginLink = styled(Link)`
    display:inline-block;
    float: right;
    background:#77FFFF;
    color: #fff;
    margin: 20px 20% 20px 0px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
`;
const LoginTodo1 = () => (
    <Router>
        <div>
            <header>
                <Input onKeyUp={this.loginUp}  placeholder="账号" />
                <Input onKeyUp={this.passwordUp}  placeholder="密码" />
            </header>
        </div>
    </Router>
)
class LoginTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:"",
            password:"",
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <h1>Todo登录</h1>
                        <Input onKeyUp={this.loginUp}  placeholder="账号" />
                        <Input onKeyUp={this.passwordUp}  placeholder="密码" />
                    </header>
                    <LoginLink to="/all">登录</LoginLink>
                    <div style={{clear:"both"}} ></div>
                </div>
            </Router>
        )
    }
}
export default LoginTodo;
