import cache from 'utils/cache';
import { ACTION_TYPE_TOGGLE_THEME } from 'config';

const DEFAULT_STATE = {
  isLoaded: false,
  error: null,
  theme: cache('theme') || 'dark',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_TOGGLE_THEME: {
      return Object.assign({}, state, {
        theme: state.theme === 'dark' ? 'light' : 'dark',
      });
    }
    default:
      return state;
  }
};
