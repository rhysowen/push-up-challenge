import React from 'react';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import AppContainer from './containers/AppContainer';

// Only log when node constant __DEV__ is active.
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleMiddleware,
      loggerMiddleware,
    ),
  );

  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
