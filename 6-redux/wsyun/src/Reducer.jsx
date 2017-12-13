import { combineReducers } from 'redux'

const todosReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD':
            let id = state.length>0 ? state[state.length-1].id + 1 : 1
            return [...state,{
                id: id,
                text: action.text,
                completed: false}];
        case 'DEL':
            return state.filter(t => t.id !== action.id);
        case 'TOGGLE':
            return state.map(t => {
               return  {
                id:t.id,
                text:t.text,
                completed: t.id===action.id ? !t.completed : t.completed}
            });
        case 'TOGGLE_ALL':
            return state.map(t => t.completed = action.checked);
        case 'CLEAR_COMPLETED':
            return state.filter(t => !t.completed);
        default:
            return state;
    }
}
const filterReducer = (state = 'ALL', action) => {
    switch(action.type){
        case 'FILTER':
            return action.filter;
        default:
            return state;
    }
}

const reducer = combineReducers({
    todosReducer,
    filterReducer
  });

export default reducer;