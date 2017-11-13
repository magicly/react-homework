import React from 'react';
import styled from "styled-components";
import {
    Redirect
} from 'react-router-dom';


const LoginComponent = ({
    className,
    userName,
    password,
    nameListener,
    passwordListener,
    message,
    login,
    loginKeyDwon
}) => {
    return (
        <div>
            <Logo>todos</Logo>
            <div className={className} tabIndex='-1'>
                <dl>
                    <dt>
                        <div className='header'>
                            <h3>登&nbsp;录</h3>
                        </div>
                    </dt>
                    <dt></dt>
                    <dt>
                        <div className='letter'>
                            用户名:&nbsp;
                            <input type="text" defaultValue={userName} onChange={nameListener} tabIndex='1' />
                            <span id="name_msg"></span>
                        </div>
                    </dt>
                    <dt>
                        <div className='letter'>
                            密&nbsp;&nbsp;&nbsp;码:&nbsp;
                            <input type="password" defaultValue={password}
                                className="password" onChange={passwordListener}
                                onKeyDown={loginKeyDwon} tabIndex='2' />
                            <span id="password_msg"></span>
                        </div>
                    </dt>
                    <dt>
                        <div>
                            <input type="button" onClick={login} value='登 录' tabIndex='3' />
                            <MsgLogIn><span>{message}</span></MsgLogIn>
                        </div>
                    </dt>
                    <span>You must log in </span>
                    <span>userName:<strong>todo</strong></span>
                    <span> password:<strong>123456</strong></span>
                </dl>
            </div>

        </div>
    );
}

const MsgLogIn = styled.div`
    float:right;
    margin-right:130px;
    span{
        display:inline;
        padding:5px;
        color:red;
    }
` 
const Logo = styled.h1`
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
`
const LoginStyled = styled(LoginComponent) `
    background:#232332;
	overflow:hidden;
    font-family:'微软雅黑';
    
    width:500px;
    background:#eee;
    position:absolute;
    border-radius:5px;
    overflow:hidden;
    outline:0 none;
    border:1px solid #fff;

    .log_in{
        left:-300000%;
        animation:move_in 0.4s linear forwards;
        -webkit-animation:move_in 0.4s linear forwards;
        -moz-animation:move_in 0.4s linear forwards;
        -o-animation:move_in 0.4s linear forwards;
    }

    dt{
        margin-bottom:20px;
    }

    .header{
        height:55px;
        color:#eee;
        background:#13A89E;
    }

    h3{
        line-height:55px;
        font-family:'宋体';
        font-size:25px;
        font-weight:400;
        text-indent:1.5em;
    }
    input[type=text],input[type=password]{
        height:30px;
        width:250px;
        padding:0 5px;
        border:1px solid #13A89E;
        border-radius:3px;
        letter-spacing:0.01em;
    }
    input[type=button]{
        width:120px;
        height:30px;
        border:1px solid #13A89E;
        border-radius:3px;
        cursor:pointer;
        font-size:16px;
        color:#13A89E;
        margin-left:110px;
        transition:all 0.4s;
    }
    input[type=button]:hover{
        background:#13A89E;
        color:#fff;
    }
    .letter{
        color:#13A89E;
        text-indent:4em;
        margin-left:5px;
        position:relative;
    }
    span{
        display:block;
    }
    strong{
        color:green;
        font-size:16px;
    }

`
const Content = styled.div`
    margin:100px auto;
    text-align:center;
    line-height:40px;
    color:#444;
`
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.from = "/";
        if (this.props.location.state) {
            this.from = this.props.location.state.from.pathname;
        }
        this.state = {
            second: 3,
            message:"",
            userName: "",
            password: "",
            hasLogin: false
        }
    }

    //监听输入框的值变化
    nameListener = (e) => {
        let value = e.target.value.replace(/^\s+|\s+$/g, "");
        this.setState({
            userName: value,
        });
    }
    passwordListener = (e) => {
        let value = e.target.value.replace(/^\s+|\s+$/g, "");
        this.setState({
            password: value,
        });
    }
    loginKeyDwon = (e) => {
        if (e.keyCode === 13) {
            this.login();
        }
    }
    login = () => {
        let userName = this.state.userName;
        let password = this.state.password;
        if (userName === "" || password === "") {
            alert("请输入用户名和密码后再登录！");
            return;
        }

        if (userName !== "todo") {
            alert("请输入正确的用户名！");
            return;
        }
        if (password !== "123456") {
            alert("请输入正确的密码！");
            return;
        }
        
        this.setState({message:"登录中,请稍等...",});

        this.timer = setTimeout(() => {
            this.setState({
                hasLogin: "true",
                userName: "",
                password: "",
            })
        }, 3000);
       
        localStorage.setItem("hasLogin", "true");
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
    }

    render() {
        if (this.state.hasLogin === "true") {
            return (
                <Redirect to={this.from} />
            )
        } 
        return (
            <LoginStyled
                hasLogin={this.state.hasLogin}
                message={this.state.message}
                login={this.login}
                loginKeyDwon={this.loginKeyDwon}
                nameListener={this.nameListener}
                passwordListener={this.passwordListener}
            />
        );
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
}

export default Login;