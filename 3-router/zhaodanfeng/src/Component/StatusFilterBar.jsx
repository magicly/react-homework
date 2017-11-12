import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TodoFooter = styled.footer`
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
`
const TodoCountSpan = styled.span`
    float: left;
    text-align: left;
`
const Strong = styled.strong`
    font-weight: 300;
`
const BtnsUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
`
const BtnLi = styled.li`
    display: inline;
`
const ALink = styled.a`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: ${props => props.checked ? 'rgba(175, 47, 47, 0.2)' : '#ffffff'};
`
const FilterLink = ALink.withComponent(Link);

const ClearBtn = styled.button`
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    display: ${props => props.displayStatus ? 'block': 'none'};
`

class StatusFilterBar extends Component{

    clickFilter = (code) => {
        this.props.handleFilter(code);
    };

    render() {
        let filterActions = [{'code': 'all', 'name': '显示全部'}, {'code': 'active', 'name': '未完成'}, {'code': 'completed', 'name': '已完成'}];
        filterActions = filterActions.map(element => (
            <BtnLi key={element.code}>
                <FilterLink  checked={this.props.action === element.code} to={`/${element.code}`} onClick={() => (this.clickFilter(element.code))}>{element.name}</FilterLink>
            </BtnLi>
        ));
        return (
            <TodoFooter>
                <TodoCountSpan>还有<Strong>{this.props.todosCount}</Strong>个任务未完成</TodoCountSpan>
                <BtnsUl>{filterActions}</BtnsUl>
                <ClearBtn displayStatus={this.props.showClear} onClick={this.props.handleRemove}>清除已完成任务</ClearBtn>
            </TodoFooter>
        );
    }
}

export default StatusFilterBar;