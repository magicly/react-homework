import React from "react";
import styled from "styled-components";

const Footer = props => {
    return (
        <div className={props.className}>
            <LeftItem>{props.itemLeft} item left</LeftItem>
            <div>
                <span
                    className={props.showWays === "all" ? "selected" : ""}
                    onClick={() => props.showItem("all")}
                >
                    All
                </span>
                <span
                    className={props.showWays === "com" ? "selected" : ""}
                    onClick={() => props.showItem("com")}
                >
                    Active
                </span>
                <span
                    className={props.showWays === "act" ? "selected" : ""}
                    onClick={() => props.showItem("act")}
                >
                    Completed
                </span>
            </div>
            <DeleteBtn onClick={() => props.deleteChecked()}>
                Clear completed{" "}
            </DeleteBtn>
        </div>
    );
};

const Span = styled.span`
    zoom: 1;
    float: left;
    display: inline;
    font-size: 10px;
    text-decoration: none;
    color: inherit;
    text-align: center;
`;

const FooterWithStyle = styled(Footer) `
    margin: 0;
    padding: 5px;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    div {
        float: left;
        display: inline;
        text-align: center;
        margin-left: 100px;
        align-content: center;
    }
    div span {
        zoom: 1;
        float: left;
        display: inline;
        font-size: 10px;
        text-decoration: none;
        color: inherit;
        text-align: center;
        margin: 1px;
        text-decoration: none;
        border: 1px solid transparent;
        padding: 3px 10px;
        vertical-align: baseline;
        outline: none;
        cursor: pointer;
        text-align: center;
        border-radius: 3px;
    }
    div span:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }
    div span.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }
    `;




/**删除勾选按钮 */
const DeleteBtn = Span.extend`
    margin-left: 50px;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    float: left;
    cursor: pointer;
    text-align: center;
    :hover {
    text-decoration: underline;
    color: black;
    }
`;
/**剩余item */
const LeftItem = Span.extend`
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    text-align: center;
`;

export default FooterWithStyle;