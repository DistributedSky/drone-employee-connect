import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
// import 'bootstrap';
import store from './config/store';
import routes from './config/routes';

import './index.html';

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes(store)} />
  </Provider>,
  document.getElementById('root')
);
