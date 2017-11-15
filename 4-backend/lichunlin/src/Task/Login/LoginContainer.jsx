import React,{Component} from 'react';
import Header from '../Common/Header';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import {
    Redirect,
} from 'react-router-dom';

const authorize = {
    hasLogin : () => {
        let user = localStorage.getItem("user");
        if (user !== "" && user !== null) {
            user = JSON.parse(user);
            return true;
        }
        return false;
    },
    login : (userName, password) => {
        let user = localStorage.getItem("user");
        if (user !== "" && user !== null) {
            user = JSON.parse(user);
            return true;
        } else if (userName !== "" 
            && userName !== null 
            && password !== "" 
            && password !== null) {
            user = {};
            user.userName = userName;
            user.password = password;
            localStorage.setItem("user", JSON.stringify(user));
            return true;
        }
        return false;
    },
    getUser : () => {
        let user = localStorage.getItem("user");
        if (user !== "" && user !== null) {
            user = JSON.parse(user);
            return user;
        }
        return null;
    }
}

class LoginContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName:"",
            password:"",
            validUserName:"",
            validPassword:"",
            loading:false,
        }
    }

    loginSubmit = () => {
        let userName = this.state.userName;
        let password = this.state.password;
        let validUserName = this.state.validUserName;
        let validPassword = this.state.validPassword;
        if (userName === null 
            || userName === undefined 
            || userName === "") {
            validUserName = validUserName === "error-input1" ? "error-input2" : "error-input1";
        } else {
            validUserName = "";
        }
        if (password === null 
            || password === undefined 
            || password === "") {
            validPassword = validPassword === "error-input1" ? "error-input2" : "error-input1";
        } else {
            validPassword = "";
        }
        this.setState({
            loading:true,
        });
        let loading = setTimeout(() => {
            if (authorize.login(userName, password)) {
                this.setState({
                    userName:userName,
                    password:password,
                    validUserName:validUserName,
                    validPassword:validPassword,
                    loading:false,
                });
            } else {
                this.setState({
                    validUserName:validUserName,
                    validPassword:validPassword,
                    loading:false,
                });
            }
            clearTimeout(loading);
        }, 500);
    }

    userNameChange = (e) => {
        let userName = e.target.value;
        if (e.keyCode === 13) {
            this.loginSubmit();
        }
        this.setState({
            userName:userName,
        });
    }

    passwordChange = (e) => {
        let password = e.target.value;
        if (e.keyCode === 13) {
            this.loginSubmit();
        }
        this.setState({
            password:password,
        });
    }

    render () {
        let location = this.props.location;
        let redirectPath;
        if (location.state !== undefined) {
            redirectPath = location.state.from.pathname;
        } else {
            redirectPath = "/";
        }
        return(
            authorize.hasLogin()
            ? <Redirect to={redirectPath}/>
            : <SectionStyled>
                <Header
                    showInput={false}
                    headerContent={"login"}
                />
                <LoginForm 
                    loginSubmit={this.loginSubmit}
                    userNameChange={this.userNameChange}
                    passwordChange={this.passwordChange}
                    validUserName={this.state.validUserName}
                    validPassword={this.state.validPassword}
                    loading={this.state.loading}
                />
            </SectionStyled>
        )
    }
}

const SectionStyled = styled.section`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
    margin-top: -90px;
    width: 100%;

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

export default LoginContainer;
export {authorize};