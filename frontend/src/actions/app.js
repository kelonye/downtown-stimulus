import cache from 'utils/cache';
import { ACTION_TYPE_TOGGLE_THEME } from 'config';

export function toggleTheme() {
  return async(dispatch, getState) => {
    dispatch({ type: ACTION_TYPE_TOGGLE_THEME });
    cache('theme', getState().app.theme);
  };
}
