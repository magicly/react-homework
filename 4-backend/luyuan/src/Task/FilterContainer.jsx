import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Prompt,
    Switch,
    Link
} from 'react-router-dom';

const Footer = styled.footer`
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
`
const FooterCount = styled.span`
    float: left;
    text-align: left;
    .strong{
        font-weight: 300;
    }
`
const FooterLi = styled.li`
    display: inline;
    margin-left:5px;
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: ${props => props.selected ? 'rgba(175, 47, 47, 0.2)' : ''};
    a{
        padding: 3px 7px;
        color:#777;
        text-decoration:blink;
    }
`
const FooterList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
`
const FooterClearButton = styled.button`
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
`
const FilterListButton = ({ status }) => {
    return (
        <FooterList>
            <FooterLi selected={status === 'all'}>
                <Link to="/">All</Link>
            </FooterLi>
            <FooterLi selected={status === 'active'}>
                <Link to="/active">Active</Link>
            </FooterLi>
            <FooterLi selected={status === 'completed'}>
                <Link to="/completed">Completed</Link>
            </FooterLi>
        </FooterList>
    )
}

const FilterClearButton = ({ list, handler }) => {
    if (list.filter(x => x.Completed === true).length > 0) {
        return <FooterClearButton onClick={handler}>Clear completed</FooterClearButton>
    }
    return "";
}

const FilterContainer = ({ itemcount, list, filterStatus, handlerDelAll }) => {
    if (list.length === 0) { return ""; }
    let stauts = "all";
    if (filterStatus === false) { stauts = "active" }
    else if (filterStatus === true) { stauts = "completed" }
    return (
        <Footer>
            <FooterCount>
                <strong>{itemcount}</strong>
                <span> </span>
                <span>item</span>
                <span> left</span>
            </FooterCount>
            <FilterListButton status={stauts} />
            <FilterClearButton list={list} handler={handlerDelAll} />
        </Footer>
    )
}

export default FilterContainer;