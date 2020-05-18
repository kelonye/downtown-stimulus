import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'reducers';
import * as asyncInitialState from 'redux-async-initial-state';
import loadStore from './load';
import { createBrowserHistory } from 'history';

const storeCreator = asyncInitialState.middleware(getState =>
  loadStore.load(getState)
);

export const store = (window.store = createStore(
  reducer,
  compose(applyMiddleware(thunk, storeCreator)) /// storeCreator should come last so dispatch works well i.e. returns promises
));

export const basename = '/';

export const history = createBrowserHistory({ basename });

store.dispatch({ type: 'noop' }); // required for some reason ??

export default store;
