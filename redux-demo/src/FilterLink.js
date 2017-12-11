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

export default FilterLink;