import { ACTION_TYPE_UPDATE_NEAR } from 'config';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_UPDATE_NEAR: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};
