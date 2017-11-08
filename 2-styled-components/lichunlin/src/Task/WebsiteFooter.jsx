import React from 'react';
import styled from 'styled-components';

const WebsiteFooter = () => {
    return (
        <footer>
            <p>Double-click to edit a todo</p>
            <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    )
}

const WebsiteFooterStyled = styled(WebsiteFooter)`
    .info {
        margin: 65px auto 0;
        color: #bfbfbf;
        font-size: 10px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .info p {
        line-height: 1;
    }

    .info a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }

    .info a:hover {
        text-decoration: underline;
    }
`

export default WebsiteFooterStyled;