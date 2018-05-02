import { pick } from 'lodash';

const preservedState = ['global.currentUser', 'global.token'];

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const stateToSave = pick(state, preservedState);
    localStorage.setItem('state', JSON.stringify(stateToSave));
  } catch (err) {
    console.log(`Write state to localStorage failed: ${err}`);
  }
};
