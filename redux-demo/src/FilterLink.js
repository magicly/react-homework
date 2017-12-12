import React from 'react';

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

class FilterLinkContainer extends React.Component {
  componentDidMount() {
    this.listener = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  render() {
    const props = this.props;
    const { store } = this.props;
    const state = store.getState();
    return (
      <FilterLink
        filter={props.filter}
        currentFilter={state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </FilterLink>
    );
  }
}

export default FilterLinkContainer;