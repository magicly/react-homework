import React from 'react';
import styled from 'styled-components';


const HeaderSimple = ({ className, value, changeAddValue }) => {
    return (
        <header className={className}>
            <h1>todos</h1>
            <input placeholder="What needs to be done?" value={value} onChange={changeAddValue} />
        </header>
    );
}

const Header = styled(HeaderSimple) `
    margin-top: 10px;
    input{
        padding: 16px 16px 16px 60px;
        border:0;
        outline:none;
        font-size: 24px;
        width: 454px;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    input::-webkit-input-placeholder {
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

export default Header;