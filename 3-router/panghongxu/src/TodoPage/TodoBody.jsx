import React from 'react';
import styled from "styled-components";


const TodoBodyComponent = ({
    className,
    todoList,
    botton_status,
    checkedAll,
    completeCount,
    deleteList,
    chooseList,
    showUpdateEvent,
    hideUpdateEvent,
    updateWords
})=>{
    return(
        <div className={className} primary={todoList.length}>
            <CheckBox 
                type="checkbox" 
                onClick={checkedAll} 
                primary={(todoList.length - completeCount) === 0 && (completeCount > 0)}>
            </CheckBox>
            <ShowList
                botton_status={botton_status}
                data={todoList} 
                deleteList={deleteList} 
                chooseList={chooseList} 
                showUpdateEvent={showUpdateEvent} 
                hideUpdateEvent={hideUpdateEvent} 
                updateWords={updateWords}> 
            </ShowList>
        </div>
    );   
}

const TodoBody = styled(TodoBodyComponent)`
    outline: none;  
    display: ${props => props.primary === 0 ? 'none' : 'block'};
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`
const CheckBox = styled.input`
    color: ${props => props.primary ? '737373' : '#e6e6e6'};
    outline: none;
        position: absolute;
        top: -55px;
        left: -12px;
        width: 60px;
        height: 34px;
        text-align: center;
    border: none; 
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
    
    :before {
        content: '❯';
        font-size: 22px;
        padding: 10px 27px 10px 27px;
    }

    :checked:before {  
    }
`
const ShowListComponent = ({
    className,
    botton_status,
    data,
    deleteList,
    chooseList,
    showUpdateEvent,
    hideUpdateEvent,
    updateWords,
    ListenerUpdateValue
}) => {
    return (
        <ul className={className}>
            {
                data.map(element1 =>
                    <ListOne key={element1.id} 
                        primary={(botton_status === "complete" && element1.status ==="complete")
                             ||  (botton_status === "active"   && element1.status ==="active")
                             ||  (botton_status === "all")}>
                        <li className={(element1.status === "complete" ? "completed " : "")+ (element1.editor ? "editing " : "")}>
                            <div className="view">
                                <input className="toggle" 
                                    readOnly="true" type="checkbox" 
                                    onClick={() => chooseList(element1.id, data)}     
                                    checked={element1.status === "complete" ? "checked" : ""}>
                                </input>
                                <label 
                                    onDoubleClick={() => showUpdateEvent(element1.id, data)} >{element1.content}
                                </label>
                                <button className="destroy" 
                                    onClick={() => deleteList(element1.id, data)}>
                                </button>
                            </div>
                            <input className="edit" id={element1.id}
                                defaultValue={element1.content} 
                                onBlur = {hideUpdateEvent}
                                onKeyUp={updateWords} onChange={ListenerUpdateValue}>
                            </input>
                        </li>
                    </ListOne>
                )
            }
        </ul>
    );
}
const ShowList = styled(ShowListComponent)`
    outline: none;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 2;
    li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    li.editing {
        border-bottom: 1px solid #ededed;
        padding: 0;
    }

    li.editing .edit {
        display: block;
        width: 468px;
        font-size: 24px;
        padding: 13px 17px 12px 17px;
        margin: 0 0 0 43px;
    }

    li.editing .view {
        display: none;
    }

    li .toggle {
        outline: none;
        text-align: center;
        width: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
        background: none;
        height:40px;
    }

    li .toggle:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    li .toggle:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    li label {
        white-space: pre-line;
        word-wrap: break-word;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li label[for='toggle'] {
        display: none;
    }

    li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 0px;
        transition: color 0.2s ease-out;
        cursor: pointer;
    }

    li .destroy:hover {
        color: #af5b5e;
    }

    li .destroy:after {
        content: '×';
    }

    li:hover .destroy {
        display: block;
    }

    li .edit {
        display: none;
    }

    li.editing:last-child {
        margin-bottom: -1px;
    }
`
const ListOne = styled.div`
    display: ${props => props.primary ? 'block' : 'none'};
`

export default TodoBody;