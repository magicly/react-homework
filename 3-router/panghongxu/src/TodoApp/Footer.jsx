import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const FooterComponent = ({
    className,
    todoList,
    bottonStatus,
    clearComplete
}) => {
    let notCompleteCount = todoList.reduce((total, item) => total + (item.status==='complete' ? 0 : 1), 0);
    let completeCount = todoList.length - notCompleteCount;
    return (
        <div>
            {todoList.length <= 0 ? null :
                <footer className={className}>
                    <Span>
                        <strong>{notCompleteCount}</strong>
                        <span>items</span>
                        <span>left</span>
                    </Span>
                    <UlBottom>
                        <li>
                            <LinkStyledBotton
                                to="/all" 
                                className={bottonStatus === "all" ? "selected" : ""} >All
                            </LinkStyledBotton>
                        </li>
                        <span></span>
                        <li>
                            <LinkStyledBotton
                                to="/active" 
                                className={bottonStatus === "active" ? "selected" : ""} >Active
                            </LinkStyledBotton>
                        </li>
                        <span></span>
                        <li>
                            <LinkStyledBotton
                                to="/complete" 
                                className={bottonStatus === "complete" ? "selected" : ""} >Completed
                            </LinkStyledBotton>
                        </li>
                    </UlBottom>
                    <ClearBotton onClick={() => clearComplete()} primary={completeCount}>Clear completed</ClearBotton>
                </footer>
            }
        </div>
    );
}

const Footer = styled(FooterComponent) `
    outline: none;
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    :before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
    @media screen and (max-width: 430px) {
        height: 50px;
    }

    @media (max-width: 430px) {
        height: 50px;
    }
`
const ClearBotton = styled.button`
    display: ${props => props.primary === 0 ? 'none' : 'block'};
    float: right;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
    @media screen and (max-width: 430px) {
        margin-top:25px;
        font-size:8px;
        line-height: 10px;
    }

    @media (max-width: 430px) {
        margin-top:25px;
        font-size:8px;
        line-height: 10px;
    }
`
const UlBottom = styled.ul`
    outline: none;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    li {
        display: inline;
    } 

    li a.selected,:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    @media screen and (max-width: 430px) {
        li {
            display: block;
        }
    }

    @media (max-width: 430px) {
        li {
            display: block;
        }
    }
`
const LinkStyled = styled.a`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
`
const LinkStyledBotton = LinkStyled.withComponent(Link);

const Span = styled.span`
    float: left;
    text-align: left;
    span{
        padding-left:6px;
    }
    strong {
        font-weight: 300;
    }
    @media screen and (max-width: 430px) {
        span{
            height:10px;
            padding-bottom:2px;
            padding-left:0px;
            display:block;
        }
        strong {
            height:6px;
        }
    }

    @media (max-width: 430px) {
        span{
            height:10px;
            padding-bottom:2px;
            padding-left:0px;
            display:block;
        }
        strong {
            height:6px;
        }
    }
`
export default Footer;