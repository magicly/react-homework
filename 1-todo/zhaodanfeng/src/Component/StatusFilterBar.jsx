import React from 'react';

function StatusFilterBar(props){
    let filterActions = [{'code': 'all', 'name': '显示全部'}, {'code': 'active', 'name': '未完成'}, {'code': 'completed', 'name': '已完成'}];
    filterActions = filterActions.map(element => (
        <button className="filterBtn" key={element.code} value={element.code} onClick={props.handleFilter}>{element.name}</button>
    ));
    let displayStatus = props.showClear ? 'inline-block' : 'none';
    return (
        <div className="statusFilterBar">
            <span className="todosCountSpan">还有{props.todosCount}个任务未完成</span>
            {filterActions}
            <a href="javascript:;" className="clearA" 
                style={{display: displayStatus}}
                onClick={props.handleRemove}>清除已完成任务</a>
        </div>
    );
}

export default StatusFilterBar;