import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import LoginOut from './LoginOutComponent.jsx';
import { Link } from 'react-router-dom';

const UserContainer = () => {   
    if (!global.userInfo.hasLogin) {
        return "";
    }
    return (
        <span>
            当前登录用户: <strong>{global.userInfo.loginName}</strong>  <Link to="/loginout">退出</Link>
        </span>
    )
}
export default UserContainer;
