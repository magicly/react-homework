import React from 'react';
import styled from 'styled-components';
//内容样式
const Section = styled.section`
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`;
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const Li = styled.li`
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    display:block;
    input{
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
    }
     input[type="checkbox"]{
         outline: none;
     }
    input:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }
    input:checked:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
    label {
      white-space: pre-line;
      word-break: break-all;
      padding: 15px 60px 15px 15px;
      margin-left: 45px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }
    :hover button {
      display: block;
    }
`;
const Button = styled.button`
    border: 0;
    background: none;
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
`;
//Todo内容
const TodoSection = (props) =>{
    return (
        <Section>
            <Ul>
                {props.list.map(
                    todoData => {
                        return (
                            //这里是迭代出来的数组值，怎么把迭代的值传给css去判断？
                            <Li key={todoData.id} style={{display:todoData.show ? 'block':'none'}}>
                                <div>
                                    <input type='checkbox' checked={todoData.inpState}
                                           onClick={listTodoState =>{props.saveTodoState(todoData.name,todoData.inpState)}}/>
                                    <label style={{color:todoData.inpState ? '#d9d9d9':'', 'text-decoration':todoData.inpState ? 'line-through':''}}>
                                        {todoData.name}
                                    </label>
                                    <Button className="destroy" onClick={listDeleteTodo =>{props.deleteTodoTask(todoData.name)}}></Button>
                                </div>
                            </Li>
                        )
                    }
                )}
            </Ul>
        </Section>
    )
};
export default TodoSection;
