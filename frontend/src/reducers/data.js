import { ACTION_TYPE_UPDATE_DATA } from 'config';

const DEFAULT_STATE = {
  businesses: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_UPDATE_DATA: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};
