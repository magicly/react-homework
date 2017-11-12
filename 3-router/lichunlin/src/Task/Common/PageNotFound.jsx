import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';

const PageNotFound = () => {
    return (
        <SectionStyled>
            <Header 
                showInput={false}
                headerContent={"404"}
            />
            <Router>
                <Link to="/All">回到首页</Link>
            </Router>
        </SectionStyled>
    )
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
    a {
        color: #4d4d4d;
        line-height: 1.4em;
        font-weight: 300;
        font-size: 30px;
        cursor: pointer;
        text-decoration: none;
    }
`

export default PageNotFound;