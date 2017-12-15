import React from 'react';
import { connect } from 'react-redux';

const FilterLink = ({
  filter,
  currentFilter,
  onClick,
  children,
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return <a href='#'
    onClick={e => {
      e.preventDefault();
      onClick(filter);
    }}
  >
    {children}
  </a>
}

const mapState2Props = (state, ownProps) => ({
  filter: ownProps.filter,
  currentFilter: state.visibilityFilter,
});

const mapDispatch2Props = (dispatch, ownProps) => ({
  onClick: () =>
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
})

export default connect(mapState2Props, mapDispatch2Props)(FilterLink);