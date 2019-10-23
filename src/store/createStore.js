/* global __DEV__ */
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

export default (reducers, middlewares) => {
  // const composeEnhancers = composeWithDevTools({
  //   realtime: true,
  //   name: 'GoBarber',
  //   port: 8081,
  // });

  const enhancer =
    __DEV__ === true
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares),
        )
      : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
