export const loadState = () => {
  try {
    const json = localStorage.getItem('state');
    if (json === null) return undefined;
    return JSON.parse(json);
  } catch (e) {
    console.log('loadState error: ', e);
    return undefined;
  }
}

export const saveState = state => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem('state', json);
  } catch (e) {
    console.log('saveState error: ', e);
  }
}