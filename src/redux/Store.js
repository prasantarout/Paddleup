import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import RootSaga from '../saga/RootSaga';
import CmsReducer from './reducer/CmsReducer';
import AuthReducer from './reducer/AuthReducer';
import ProfileReducer from './reducer/ProfileReducer';
import SessionReducer from './reducer/SessionReducer';

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
export default configureStore({
  reducer: {
    CmsReducer: CmsReducer,
    AuthReducer: AuthReducer,
    ProfileReducer: ProfileReducer,
    SessionReducer:SessionReducer
  },
  middleware,
});
SagaMiddleware.run(RootSaga);
