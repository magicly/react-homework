import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

export default combineReducers({
  byId,
  listByFilter,
});

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
}

export const getIsFetching = (state, filter) => fromList.getIsFetching(state.listByFilter[filter])

export const getErrMsg = (state, filter) => fromList.getErrMsg(state.listByFilter[filter])