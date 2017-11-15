import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

const Login = (props) => {
  return (
    <div>
      <h1>登录页</h1>
      <input type="text" placeholder="请输入用户名" value={props.userName}
        onChange={(e) => {
          props.changeUserName(e.currentTarget.value)
        }}
      />
      <br /> <br />
      <input type="password" placeholder="请输入密码" value={props.password}
        onChange={(e) => {
          props.changePassword(e.currentTarget.value)
        }}
      />
      <br /> <br />
      <input type="button" value='登录'
        onClick={() => {
          props.login()
        }}
      />
    </div>
  )
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }

  changeUserName = (userName) => {
    this.setState({
      userName: userName
    })
  }

  changePassword = (password) => {
    this.setState({
      password: password
    })
  }

  login = () => {
    if (this.state.userName === '' || this.state.password === '') {
      alert("请输入完整的用户名和密码！");
      return;
    }

    localStorage.setItem("todoMVCLoginStatus", "true");
    localStorage.setItem("todoMVCUserName", this.state.userName);
    this.setState({
      userName: '',
      password: '',
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    let todoMVCLoginStatus = localStorage.getItem("todoMVCLoginStatus");
    if (todoMVCLoginStatus === "true") {
      return <Redirect to={from} />
    }

    return <Login
      userName={this.state.userName}
      password={this.state.password}
      changeUserName={(userName) => this.changeUserName(userName)}
      changePassword={(password) => this.changePassword(password)}
      login={() => this.login()}
    />
  }
}

export default LoginContainer;
