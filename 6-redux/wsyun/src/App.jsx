import { connect } from 'react-redux';
import Todos from './Todos.jsx';

    const mapState2Props = state => {
        return {
            todos: state.todosReducer.filter(t=>{
                return t.completed === (state.filterReducer==='COMPLETED') || state.filterReducer === 'ALL'
            }),
            filter: state.filterReducer,
            activeCount: state.todosReducer.reduce((total, value) => total + (value.completed ? 0 : 1), 0),
            completedCount: state.todosReducer.reduce((total, value) => total + (value.completed ? 1 : 0), 0)
        };
      }

    const mapDispatch2Props = dispatch => {
        return {
            onAddClick: (text) =>
                dispatch({
                type: 'ADD',
                text
            }),
            onDelClick: (id) =>
                dispatch({
                type: 'DEL',
                id
            }),
            onToggleClick: (id) =>
                dispatch({
                type: 'TOGGLE',
                id
            }),
            onFilterClick: (filter) =>
                dispatch({
                type: 'FILTER',
                filter
            }),
            onToggleAllClick: (checked) =>
                dispatch({
                type: 'TOGGLE_ALL',
                checked
            }),
            onClearCompletedClick: (filter) =>
                dispatch({
                type: 'CLEAR_COMPLETED'
            })
        }
    }

    export default connect(mapState2Props, mapDispatch2Props)(Todos);
