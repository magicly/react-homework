import React  from 'react';
import styled from 'styled-components';

const Todosection = styled.section`

    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
    label[for=input] {display: none;}

`
const Todoinput = styled.input`

    position: absolute;
    top: -55px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none; /* Mobile Safari */

    :before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    :checked:before {
        color: ${props => props.checked ? '#737373' : ''};
    }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-appearance: none;
        appearance: none;
    
    }

`

const TodoUl = styled.ul`

    margin: 0;
    padding: 0;
    list-style: none;

`

const Todoli = styled.li`

    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    :last-child {border-bottom: none;}
    :hover button { display: block;}

`
const TodoLiInput = styled.input`

    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none; /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;

    :after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    :checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        height: 40px;
    }

`


const Todolabel = styled.label`

    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    color: ${props => props.completed ? '#d9d9d9' : 'black'};
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    
`
const Todop = styled.p`

    display: block;

`
const Listbutton = styled.button`

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
    :hover {color: #af5b5e;}
    :after {content: '×';}

`

const Section = (props) => {
   
    return (
        <Todosection>
            <Todoinput type='checkbox' checked={props.checked} onChange={props.checkAll} />
            <TodoUl>
                {props.things.map(thing => {
                    return (
                        <Todoli key={thing.task}>
                            <Todop>
                                <TodoLiInput type="checkbox" onChange={() => props.done(thing.task)} checked={thing.done} />
                                <Todolabel completed={thing.done}>{thing.task}</Todolabel>
                                <Listbutton onClick={(e) => props.delete(thing.task)}></Listbutton>
                            </Todop>
                        </Todoli>
                    );
                })}
            </TodoUl>
        </Todosection>
    )
}



export default Section;