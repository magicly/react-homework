import React from "react";
import styled from "styled-components";

/**列表*/
const CustomList = props => {
  let arr = props || [];
  let list = [];
  let showWays = props.showWays;
  let ok = showWays === "all";
  console.log("----------------------------------->" + ok);

  if (arr.data.length > 0) {
    list = arr.data.map((item, index) => {
      return (
        <CustomBox
          key={index + UniqueID()}
          isShow={showWays === "all" || (showWays === "act" && item.isChecked) || (showWays === "com" && !item.isChecked)}
        >
          <HandleCheck>
            <CustomIpt type="checkbox" checked={item.isChecked} onChange={() => props.checkOne(index)} />
          </HandleCheck>
          <CustomText className={item.isChecked ? "checked text" : "text"}>{item.name}</CustomText>

          <button onClick={() => props.deleteOne(index)} />
        </CustomBox>
      );
    });
  }
  return <div>{list}</div>;
};

//生成一个用不重复的ID
const UniqueID = () => {
  let idStr = Date.now().toString(36);
  idStr += Math.random()
    .toString(36)
    .substr(3);
  return idStr;
};

// list-box
const CustomBox = styled.div`
  display: ${props => (props.isShow ? "flex" : "none")};
  /* display:flex; */
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border: 0 none;
  padding: 12px 0;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.03);

  // del Btn
  :hover button {
    opacity: 1;
  }
  button {
    opacity: 0;
    border: 0;
    outline: none;
    cursor: pointer;
    background: none;
    width: 40px;
    height: 40px;
    font-size: 30px;
    color: #cc9a9a;
    transition: color 0.2s ease-out;
  }
  button:hover {
    color: #af5b5e;
  }
  button:after {
    content: "×";
  }
`;

// checkbox-box
const HandleCheck = styled.span`
  padding: 0;
  width: 50px;
`;

// 自定义check
const CustomIpt = styled.input`
  text-align: center;
  width: 40px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  :after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }

  :checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
`;

// 自定义文本框
const CustomText = styled.span`
  width: 100%;
  word-wrap: break-word;
  position: relative;
  max-width: 450px;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
  white-space: normal;
  //同级的就用这种写法
  &.checked {
    text-decoration: line-through;
    color: rgb(180, 177, 177);
  }
`;

export default CustomList;
