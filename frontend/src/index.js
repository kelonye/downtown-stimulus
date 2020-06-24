import 'nprogress/nprogress.css';
import './styles';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from 'store';
import App from 'components/App';

(async () => {
  document.documentElement.classList.remove('anim-loading');
  document.getElementById('loader-container').remove();
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
