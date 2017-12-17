import React from 'react';

export default ({ msg, retry }) => (
  <div>
    <p>sth wrong! {msg}</p>
    <button onClick={retry}>Retry</button>
  </div>
)