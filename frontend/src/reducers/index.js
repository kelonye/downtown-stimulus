import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import app from './app';
import wallet from './wallet';
import data from './data';

export default asyncInitialState.outerReducer(
  combineReducers({
    app,
    wallet,
    data,
    asyncInitialState: asyncInitialState.innerReducer, // last
  })
);
