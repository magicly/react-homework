import React from 'react';
import styled,{injectGlobal} from 'styled-components'

injectGlobal`
    body{
        background: #f5f5f5;
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;                
        line-height:1.4em;
        color: #4d4d4d;
    }
    input,button{
        outline:none;
    }
`
const PanelDiv = styled.div`
    width: 550px;
    margin: 0px auto;
    @media (max-width: 550px) {
        width: 100%;
    }
`
const H1 = styled.h1`
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
`
const ContentDiv = styled.div`
    background: #fff;
    box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    position: relative;
`
const HeaderDiv = styled.div`
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    height: 65px;
    overflow: hidden;
`
const InputText = styled.input`
    padding: 16px 16px 16px 55px;
    margin: 0px;
    width: 100%;
    border: none;
    font-size: 24px;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
        font-style: italic;
        color: #e6e6e6;
    }
    &::-moz-input-placeholder {
        font-style: italic;
        color: #e6e6e6;
    }
    &::input-placeholder {
        font-style: italic;
        color: #e6e6e6;
    }
`
const AllCheck = styled.input`
    position: relative;
    top: -45px;
    width: 45px;
    height: 34px;
    margin: 0px;
    padding: 0px;
    border: none;
    text-align: center;
    transform:rotate(90deg);
    appearance:none;
    &:before {
        content: '❯';
        font-size: 22px;
        color: ${props => props.checked ? '#737373' :'#e6e6e6'};
    }
`
const ItemContainerDiv = styled.div`
    font-size: 24px;
    box-sizing: border-box;
`

const ItemDiv = styled.div`
    border: 1px solid #ededed;
    overflow: hidden;
    display: -webkit-flex;
    display: ${props => props.isShow ? 'flex' : 'none'};
    &:hover button::before{
        color: #af5b5e;
        content: '×';
    }
`

const ItemCheck = styled.input`
    width: 40px;
    margin: 9px 0px;
    height: 40px;
    padding: 0px;
    border: none;
    text-align: center;
    appearance:none;
    &:before {
        content: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135">
                        <circle cx="50" cy="50" r="50" fill="none" stroke="${props => props.checked ? '#bddad5' :'#ededed'}" stroke-width="3"/>
                        ${props => props.checked ? '<line x1="74" y1="25" x2="42" y2="71" style="stroke:#5dc2af;stroke-width:5"/><line x1="24" y1="52" x2="42" y2="71" style="stroke:#5dc2af;stroke-width:5"/>' : ''}
                    </svg>\');
    }
`

const ItemTextLabel = styled.label`
    padding: 15px;
    line-height: 1.2em;
    display: block;
    width: 455px;
    flex: 1;
    box-sizing:border-box;
    color: ${props => props.checked ? '#d9d9d9' :'#4d4d4d'};
    text-decoration: ${props => props.checked ? 'line-through' :'none'};
`

const ItemDelButton = styled.button`
    width: 40px;
    margin: 9px 0px;
    padding: 0px 0px;
    border: none;
    background:transparent;
    font-size: 30px;
`

const FooterDiv = styled.div`
    padding: 10px 15px;
    color: #777;
    height: 20px;
    display: -webkit-flex; 
    display: ${props => props.isShow ? 'flex' :'none'};;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 460px) {
        height: auto;
    }
    &:before{
        content: '';
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        box-shadow:0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
`

const ItemCountSpan = styled.span`
    width: 80px;
    display: block;
    order: 1;
`

const TabUl = styled.ul`
    order: 2;
    list-style: none;
    margin: 0px;
    padding: 0px;
    text-align: center;
    width: 230px;
    @media (max-width: 460px) {
        order: 3;
        width: 100%;
    }
`

const TabLi = styled.li`
    position: relative;
    display:inline;
    border: ${props => props.selected ? '1px solid rgba(175, 47, 47, 0.2)' : '1px solid transparent'};
    margin: 0px 5px;
    padding: 3px 7px;
    border-radius:3px;
    cursor: pointer;
    &:hover{
        border: ${props => props.selected ? '1px solid rgba(175, 47, 47, 0.2)' : '1px solid rgba(175, 47, 47, 0.1)'};
    }
`
const ClearPanelDiv = styled.div`
    order: 3;
    width: 110px;
    position: relative;
    @media (max-width: 460px) {
        order: 2;
    }
`

const ClearA = styled.a`    
    display: ${props => props.isShow ? 'block' : 'none'};
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        text-decoration:underline;
    }
`
const Item = (props) => {
    let name = props.status ?  <del>{props.name}</del> : <font>{props.name}</font>;
    return (
        <ItemDiv isShow={props.isShow}>
            <ItemCheck type="checkbox" id={"chk"+props.index} checked={props.status} onChange={props.onChange} />
            <ItemTextLabel htmlFor={"chk"+props.index}  checked={props.status}>{name}</ItemTextLabel>
            <ItemDelButton onClick={props.onDelete}> </ItemDelButton>
        </ItemDiv>
    );
}

const TodosElement = (props) => {
    let itemCount = props.items.reduce((total, value) => total + (value.status==='completed' ? 0 : 1), 0);
    let itemCompletedCount = props.items.length - itemCount;
    return (
        <PanelDiv>
            <H1>todos</H1>
            <ContentDiv>
                <HeaderDiv>
                    <InputText type="text" placeholder="What needs to be done?" value={props.inputValue} onKeyDown={props.pushItem} onChange={props.changeInputText}/>
                    <AllCheck type="checkbox" onChange={props.checkAll} checked={props.isAllChecked}/>
                </HeaderDiv>

                <ItemContainerDiv>
                {
                    props.items.map((item,index) => 
                        <Item 
                            key={index}
                            index={index}
                            name={item.name} 
                            status={item.status==='completed'} 
                            isShow={props.filterStatus==="all"||props.filterStatus===item.status}
                            onChange={()=>{props.updateItem(index)}} 
                            onDelete={()=>{props.delItem(index)}} 
                        />
                    ) 
                }
                </ItemContainerDiv>

                <FooterDiv isShow={props.items.length>0}>
                    <ItemCountSpan>{itemCount} items</ItemCountSpan>
                    <TabUl>
                        <TabLi onClick = { props.filterItem} selected={props.filterStatus === 'all'}>all</TabLi>
                        <TabLi onClick = { props.filterItem} selected={props.filterStatus === 'active'}>active</TabLi>
                        <TabLi onClick = { props.filterItem} selected={props.filterStatus === 'completed'}>completed</TabLi>
                    </TabUl>
                    <ClearPanelDiv>
                        <ClearA onClick = {props.clearCompletedItem} isShow = {itemCompletedCount>0}>Clear Completed</ClearA>
                    </ClearPanelDiv>
                </FooterDiv>
            </ContentDiv>
        </PanelDiv>
    );
}
export default TodosElement;