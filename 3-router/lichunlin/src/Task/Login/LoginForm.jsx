import React from 'react';
import styled from 'styled-components';

const LoginForm = ({
    className,
    loginSubmit,
    userNameChange,
    passwordChange,
    validUserName,
    validPassword,
    loading,
}) => {
    return (
        <StyledTable>
            <tbody>
                <tr>
                    <td>
                        user:
                    </td>
                    <td>
                        <input className={validUserName} onKeyUp={userNameChange} type="text" placeholder="type you userName here"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        password:
                    </td>
                    <td>
                        <input className={validPassword} onKeyUp={passwordChange} type="password" placeholder="type you password here"/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td className="button-group">
                        {
                            loading 
                            ? <a className="loading">&nbsp;&nbsp;&nbsp;&nbsp;</a> 
                            : <a onClick={loginSubmit}>login</a>
                        }
                    </td>
                </tr>
            </tbody>
        </StyledTable>
    )
}

const StyledTable = styled.table`
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    input {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        width: 70%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
    }

    .button-group {
        text-align: right;
    }

    a {
        color: inherit;
        margin: 10px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        border-color: rgba(175, 47, 47, 0.2);
    }

    a:hover {
        border-color: rgba(175, 47, 47, 0.1);
        cursor: pointer;
    }

    @keyframes shack1 {
        from{margin-left: 10px;}
        to{margin-right: 10px;}
    }

    @keyframes shack2 {
        from{margin-left: 10px;}
        to{margin-right: 10px;}
    }

    .error-input1 {
        animation:shack1 0.1s;
        animation-iteration-count:4;
        border:1px solid rgba(247, 0, 0, 0.50);
    }

    .error-input2 {
        animation:shack2 0.1s;
        animation-iteration-count:4;
        border:1px solid rgba(247, 0, 0, 0.50);
    }

    .loading {
        background-image:url("data:image/png;base64,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");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 25px;
    }
`

export default LoginForm;