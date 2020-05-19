import cache from 'utils/cache';
import { history } from 'store';
import { ACTION_TYPE_TOGGLE_THEME } from 'config';

export function toggleTheme() {
  return async(dispatch, getState) => {
    dispatch({ type: ACTION_TYPE_TOGGLE_THEME });
    cache('theme', getState().app.theme);
  };
}

export function navigate(payload) {
  return async(dispatch, getState) => {
    history.push(payload);
  };
}

export function goHome(payload) {
  return async(dispatch, getState) => {
    dispatch(navigate('/'));
  };
}
