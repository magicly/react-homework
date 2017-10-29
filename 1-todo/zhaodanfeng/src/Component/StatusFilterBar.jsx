import React, {Component} from 'react';

class StatusFilterBar extends Component {
    render() {
        const filterActions = [{'code': 'all', 'name': '显示全部'}, {'code': 'active', 'name': '未完成'}, {'code': 'completed', 'name': '已完成'}];
        const rows = [];
        filterActions.forEach(function(element) {
            rows.push(
                <button className="filterBtn" key={element.code} value={element.code} onClick={this.props.handleFilter}>{element.name}</button>
            );
        }, this);
        let displayStatus = this.props.showClear ? 'inline-block' : 'none';
        return (
            <div className="statusFilterBar">
                <span className="todosCountSpan">还有{this.props.todosCount}个任务未完成</span>
                {rows}
                <a href="javascript:;" className="clearA" 
                    style={{display: displayStatus}}
                    onClick={this.props.handleRemove}>清除已完成任务</a>
            </div>
        );
    };
}

export default StatusFilterBar;