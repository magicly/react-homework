import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
  return (
    <div>
      {props.userName},你好 &nbsp;&nbsp;&nbsp;
      <a className="nav" onClick={() => {
        props.logout()
      }}
      >退出系统</a>？
    </div>
  )
}

class LogoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem("todoMVCUserName"),
    }
  }

  logout = () => {
    localStorage.setItem("todoMVCLoginStatus", "false");
    localStorage.setItem("todoMVCUserName", "");
    this.setState({
      userName: '',
    })
  }

  render() {
    const from = { pathname: '/login' };
    const todoMVCLoginStatus = localStorage.getItem("todoMVCLoginStatus");
    if (todoMVCLoginStatus === "false") {
      return <Redirect to={from} />
    }

    return <Logout
      userName={this.state.userName}
      logout={() => this.logout()}
    />
  }
}

export default LogoutContainer;
