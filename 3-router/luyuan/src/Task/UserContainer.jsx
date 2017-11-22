import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import LoginOut from './LoginOutComponent.jsx';
import { Link } from 'react-router-dom';

const UserContainer = () => {
    if (!localStorage.getItem("login")) {
        return "";
    }
    return (
        <span>
            当前登录用户: <strong>你好,管理员!</strong>  <Link to="/loginout">退出</Link>
        </span>
    )
}
export default UserContainer;
