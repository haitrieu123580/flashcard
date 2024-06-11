import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@/redux/root-reducer';
import rootSaga from '@/redux/root-saga';

const sagaMiddleware = createSagaMiddleware();

const initStore = () => {
  const store = configureStore({
    reducer: { ...rootReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([
        sagaMiddleware,
      ]),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
export default initStore;
