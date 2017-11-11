import React from 'react';
import styled from 'styled-components';

const Footer=styled.footer`
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
const FooterCount=styled.span`
    float: left;
    text-align: left;
    .strong{
        font-weight: 300;
    }
`

const FooterLi=styled.li`
    display: inline;
    margin-left:5px;
`
const FooterA=styled.a`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: ${props => props.selected ? 'rgba(175, 47, 47, 0.2)' : ''};
`
const FooterList=styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
`
const FooterClearButton=styled.button`
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }    
}
`

const FilterListButton = ({filterstauts,handler}) => {
    let selected_all = true, selected_active = false, selected_completed = false;
    if (filterstauts === false) { selected_active = true;selected_all=false;selected_completed=false; }
    else if (filterstauts === true) { selected_completed = true;;selected_all=false;selected_active=false; }
    return (
        <FooterList>
            <FooterLi>
                <FooterA href="#/" selected={selected_all} onClick={() => { handler(0) }}>All</FooterA>
            </FooterLi>
            <FooterLi>
                <FooterA href="#/active" selected={selected_active} onClick={() => { handler(1) }}>Active</FooterA>
            </FooterLi>
            <FooterLi>
                <FooterA href="#/completed" selected={selected_completed} onClick={() => { handler(2) }}>Completed</FooterA>
            </FooterLi>
        </FooterList>
    )
}

const FilterClearButton = ({list, handler }) => {
    if (list.filter(x => x.iscomplete === true).length > 0) {
        return <FooterClearButton onClick={handler}>Clear completed</FooterClearButton>
    }
    return "";
}



const FilterControl = ({itemcount,list,filterstauts,handlerFilter,handlerDelAll}) => {
    if(list.length===0){ return "";}
    return (
        <Footer>
            <FooterCount>
                <strong>{itemcount}</strong>
                <span> </span>
                <span>item</span>
                <span> left</span>
            </FooterCount>
            <FilterListButton  filterstauts={filterstauts} handler={handlerFilter} />
            <FilterClearButton list={list} handler={handlerDelAll} />
        </Footer>
    )
}
export default FilterControl;