import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';
import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )

);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
