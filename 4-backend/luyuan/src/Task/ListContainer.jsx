import React from 'react';
import styled from 'styled-components';

const Checkbutton = styled.input`
    position: absolute;
    top: -55px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
    transform: rotate(90deg);
    -webkit-appearance: none;
    :before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }
    :checked:before {
        color: #737373;
    }
`
const Listmain = styled.section`
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
`
const Listul = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const Listli = styled.li`
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    :last-child {
        border-bottom: none;
    }
    color: ${props => props.status ? '#d9d9d9' : ''};
    text-decoration: ${props => props.status ? 'line-through' : ''};
    :hover button{
        display:block;
    }
`
const Listlicheckbox= styled.input`
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    :after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }
    :checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
`
const Listlidelbutton= styled.button`
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    :hover {
        color: #af5b5e;
    }
    :after {
        content: '×';
    }    
`
const Listlilable=styled.label`
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s; 
`

const CheckAllTaskButton = ({list,handler}) => {
    if (list.length > 0) {
        return <Checkbutton type="checkbox" onChange={handler} />
    }
    return "";
}

const ListContainer = ({list,handlerCheckAll,handlerComplete,handlerDel}) => {
    return (
        <Listmain>
            <CheckAllTaskButton list={list} handler={handlerCheckAll} />
            <Listul>
                {
                    list.map((item, index) => {                    
                        return (
                            <Listli key={index} status={item.Completed}>
                                    <Listlicheckbox type="checkbox" onChange={() => { handlerComplete(item) }} checked={item.Completed} />
                                    <Listlilable>{item.Title}</Listlilable>
                                    <Listlidelbutton onClick={() => { handlerDel(item) }}></Listlidelbutton>
                            </Listli>
                        )
                    })
                }
            </Listul>
        </Listmain>
    )
}
export default ListContainer;