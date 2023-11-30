import { call, all } from 'redux-saga/effects';
import apiSaga from './apiSaga';

function* rootSaga() {
  yield all([
    call(apiSaga),
  ]);
}

export default rootSaga;