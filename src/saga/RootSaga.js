import { all } from 'redux-saga/effects';
import CmsSaga from './CmsSaga';
import AuthSaga from './AuthSaga';
import ProfileSaga from './ProfileSaga';
import SessionSaga from './SessionSaga';
const combinedSaga = [...CmsSaga, ...AuthSaga, ...ProfileSaga, ...SessionSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
