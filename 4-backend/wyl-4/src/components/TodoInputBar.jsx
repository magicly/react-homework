import React from "react";
import styled from "styled-components";


const InputView = props => {
    return (
        <NewTodo>
            <ToggleAll
                type="checkbox"
                checked={props.checked}
                onChange={() => props.onChange()}
            />
            <input
                className="edit"
                type="text"
                placeholder="What needs to be done?"
            />
        </NewTodo>
    );
};


//自定义Newtodo
const NewTodo = styled.div`
margin: 0;
list-style: none;
padding-left: 16px;
border: none;
display: inline;

input[type="checkbox"] {
  align-content: center;
  border: none; /* Mobile Safari */
}

input[type="checkbox"]:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 16px;
}

input[type="checkbox"]:checked:before {
  color: #737373;
}

input[type="text"] {
  position: relative;
  margin: 0;
  width: 85%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 16px 0 16px 36px;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

input[type="text"]::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input[type="text"]::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input[type="text"]::placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
`;

//自定义全选框
const ToggleAll = styled.input`
-webkit-transform: rotate(90deg);
transform: rotate(90deg);
-webkit-appearance: none;
appearance: none;
position: absolute;
top: 12px;
left: -8px;
width: 60px;
height: 34px;
text-align: center;
z-index: 9;
outline: none;
border: none; /* Mobile Safari */

&:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

&:checked:before {
  color: #737373;
}
`;

export default InputView;