import React from 'react';
import styled from 'styled-components';
import HeaderStyled from '../Common/Header';
import WebsiteFooterStyled from '../Common/WebsiteFooter';
import TaskListStyled from './TaskList';
import TaskFooterStyled from './TaskFooter';
import {injectGlobal} from 'styled-components';

const TaskComponent = ({
    className,
    taskInputKeyUp,
    showInput,
    headerContent,
    taskList,
    toggleTask,
    removeTask,
    completeAllTask,
    showTaskByGroup,
    buttonStatus,
    clearCompleted,
    intoModify,
    quitModify,
    modifyTaskKeyUp,
    userName,
    logout,
}) => {
    return (
        <div className={className}>
            <SectionStyled>
                <LogInfo>
                    <span>Welcome,{userName}</span>
                    <a onClick={logout}>logout</a>
                </LogInfo>
                <HeaderStyled 
                taskInputKeyUp={taskInputKeyUp} 
                showInput={showInput}
                headerContent={headerContent}
                />
                <TaskListStyled 
                    taskList={taskList}
                    completeAllTask={completeAllTask}
                    toggleTask={toggleTask}
                    intoModify={intoModify}
                    removeTask={removeTask}
                    quitModify={quitModify}
                    modifyTaskKeyUp={modifyTaskKeyUp}
                />
                <TaskFooterStyled
                    taskList={taskList}
                    clearCompleted={clearCompleted}
                    showTaskByGroup={showTaskByGroup}
                    buttonStatus={buttonStatus}
                />
            </SectionStyled>
            <WebsiteFooterStyled />
        </div>
    );
}

const LogInfo = styled.div`
    a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        border-color: rgba(175, 47, 47, 0.2);
        position: fixed;
        top: 4%;
        right: 10%;
    }
    span {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border-color: rgba(175, 47, 47, 0.2);
        position: fixed;
        top: 4%;
        right: 14%;
    }

    a:hover {
        border-color: rgba(175, 47, 47, 0.1);
        cursor: pointer;
    }
`

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
`

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    line-hight:1.4em;
    background:#f5f5f5;
    padding-top:250px;
    padding-bottom:100px;
    text-align:center;

    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 300;
  }

  button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    button,input[type="checkbox"] {
        outline: none;
    }

    .hidden {
        display: none;
    }

  @media (max-width: 640px) {
        .new-todo {
            font-size: 15px;
        }

        .todo-list li {
            font-size: 15px;
        }


        .todo-count {
            text-align: right;
            float: right;
            margin-top: 9px;
        }

        .filters {
            display: inline-grid;
            text-align: left;
        }

        .filters li {
            margin-top: 10px;
        }

        .todo-list li.editing .edit {
            width: 79%;
            height: 50px;
        }

        .clear-completed {
            width: 90px;
            height: 56px;
            top: 0px;
            left: 105%;
            border-radius: 5px;
            background: #FFF;
            border: 1px solid transparent;
            border-color: rgba(175,47,47,0.2);
            position: absolute;
        }
    }
`

export default TaskComponent;