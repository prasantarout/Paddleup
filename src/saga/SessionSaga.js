import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  addSessionDetailsReq,
  addSessionDetailsFailure,
  addSessionDetailsSuccess,
  getGameDetailsReq,
  getGameDetailsSuccess,
  getGameDetailsFailure,
  addCourtsDetailsFailure,
  addCourtsDetailsSuccess,
  addCourtsDetailsReq,
  deleteSessionSuccess,
  deleteSessionFailure,
  getSessionListSuccess,
  getSessionListFailure,

  getSessDetailsSuccess,
  getSessDetailsFailure,

  sessionDeleteSuccess,
  sessionDeleteFailure,

  sessionEndSuccess,
  sessionEndFailure,

  scoreHistorySuccess,
  scoreHistoryFailure,
} from '../redux/reducer/SessionReducer';

import { getApi, postApi } from '../utils/helpers/ApiRequest';
import CustomToast from '../utils/helpers/CustomToast';

let getItem = state => state.AuthReducer;

export function* sessionHandleSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/session_add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(addSessionDetailsSuccess(response?.data));
      setTimeout(() => {
        CustomToast(response?.data?.message);
      }, 800);
    } else {
      yield put(addSessionDetailsFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addSessionDetailsFailure(error?.response));
  }
}

export function* gameModeList(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'gametype/list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(getGameDetailsSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getGameDetailsFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getGameDetailsFailure(error?.response));
  }
}

export function* addCourtDetailsSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'court/court_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(addCourtsDetailsSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(addCourtsDetailsFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addCourtsDetailsFailure(error?.response));
  }
}
//session list saga
export function* getSessionListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/session_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(getSessionListSuccess(response?.data));
    } else {
      yield put(getSessionListFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getSessionListFailure(error?.response));
  }
}
//session details saga
export function* getSessDetailsSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/session_details',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(getSessDetailsSuccess(response?.data));
    } else {
      yield put(getSessDetailsFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getSessDetailsFailure(error?.response));
  }
}
//session delete saga
export function* sessionDeleteSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/session_delete',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(sessionDeleteSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(sessionDeleteFailure(response?.data));
      CustomToast(response?.data?.message);

    }
  } catch (error) {
    yield put(sessionDeleteFailure(error?.response));
  }
}


//session end saga
export function* sessionEndSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/session_end',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(sessionEndSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(sessionEndFailure(response?.data));

    }
  } catch (error) {
    yield put(sessionEndFailure(error?.response));
  }
}
//session history
export function* scoreHistorySaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/score-history',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      console.log(response, 'data');
      yield put(scoreHistorySuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(scoreHistoryFailure(response?.data));

    }
  } catch (error) {
    yield put(scoreHistoryFailure(error?.response));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Session/addSessionDetailsReq', sessionHandleSaga);
  })(),
  (function* () {
    yield takeLatest('Session/getGameDetailsReq', gameModeList);
  })(),
  (function* () {
    yield takeLatest('Session/addCourtsDetailsReq', addCourtDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Session/getSessionListReq', getSessionListSaga);
  })(),
  (function* () {
    yield takeLatest('Session/getSessDetailsReq', getSessDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Session/sessionDeleteReq', sessionDeleteSaga);
  })(),
  (function* () {
    yield takeLatest('Session/sessionEndReq', sessionEndSaga);
  })(),
  (function* () {
    yield takeLatest('Session/scoreHistoryReq', scoreHistorySaga);
  })(),
];

export default watchFunction;
