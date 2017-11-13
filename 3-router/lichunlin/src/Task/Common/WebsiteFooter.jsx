import React from 'react';
import styled from 'styled-components';

const WebsiteFooter = ({className}) => {
    return (
        <footer className={className}>
            <p>Double-click to edit a todo</p>
            <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    )
}

const WebsiteFooterStyled = styled(WebsiteFooter)`
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;

    p {
        line-height: 1;
    }

    a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }

    a:hover {
        text-decoration: underline;
    }
`

export default WebsiteFooterStyled;