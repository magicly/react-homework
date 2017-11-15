import React, { Component } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

class LoginOutComponent extends Component {
    constructor(props) {
        super(props);
        global.userInfo.loginOut();
    }   
    render() {
        return <Redirect to="/login" />
    }
}
export default LoginOutComponent;
