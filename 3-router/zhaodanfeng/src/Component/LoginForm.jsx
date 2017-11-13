import React, {Component} from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';

const Todoapp = styled.section`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
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
const LoginBtn = styled.button`
    padding: 0 15px;
    margin: 10px 40%;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
    font-weight: 500;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border-color: #d9d9d9;  
`

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLogin: false
        };
    }

    inputChange = (e) => {
        const inputId = e.currentTarget.id;
        inputId === 'username' ? this.setState({username: e.currentTarget.value}) : this.setState({password: e.currentTarget.value});
        return true;
    }

    login = () => {
        this.props.login(this.state.username, () => {
            this.setState({hasLogin: true});
        });
    }

    render() {
        let from = { pathname: '/' };
        if(this.state.hasLogin) {
            return (<Redirect to={from} />);
        }
        return (
            <Todoapp>
                <TodoappH1>todos <NameSpan>by zhaodanfeng</NameSpan></TodoappH1>
                <TodoInput type="text" placeholder="请输入用户名" id="username" value={this.state.username} onChange={this.inputChange} />
                <TodoInput type="text" placeholder="请输入密码" id="password" value={this.state.password} onChange={this.inputChange} />
                <LoginBtn type="button" onClick={this.login}><i className="iconfont icon-login"></i>登录</LoginBtn>
            </Todoapp>
        );
    }
}

export default LoginForm;