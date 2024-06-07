import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getPlayerSucces,
  getPlayerFailure,

  deletePlayerSucces,
  deletePlayerFailure,

  addPlayerSucces,
  addPlayerFailure,

  getRulesSucces,
  getRulesFailure,

  getAboutSucces,
  getAboutFailure,

  getFaqSucces,
  getFaqFailure,

  locationListSucces,
  locationListFailure,

  locationDeleteSucces,
  locationDeleteFailure,

  addLocationSucces,
  addLocationFailure,

  getCmsPageContentSucces,
  getCmsPageContentFailure,

  searchPlayerListSucces,
  searchPlayerListFailure,

  addToPlayerSucces,
  addToPlayerFailure,

  locationEditSucces,
  locationEditFailure,
  searchLocationListSucces,
  searchLocationListFailure,
  addToLocationReq,
  addToLocationFailure,
  userLocationReq,
  userLocationSucces,
  userLocationFailure,
  addToLocationSucces,
  allPublicLocationSucces,
  allPublicLocationFailure,

  updateScoreSucces,
  updateScoreFailure,

  getStaticsSucces,
  getStaticsFailure,

  getLeaderBoardSucces,
  getLeaderBoardFailure,


  submitContactSucces,
  submitContactFailure,

} from '../redux/reducer/CmsReducer';
// import { getApi, postApi } from '../utils/helpers/ApiRequest';

import { getApi, postApi } from '../utils/helpers/ApiRequest';

import CustomToast from '../utils/helpers/CustomToast';

let getItem = state => state.AuthReducer;



export function* getPlayerSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/team_player_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getPlayerSucces(response?.data));
      // Toast(response?.data?.message);
    } else {
      yield put(getPlayerFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getPlayerFailure(error?.response));
  }
}



export function* deletePlayerSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/player_delete',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(deletePlayerSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(deletePlayerFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(deletePlayerFailure(error?.response));
  }
}

export function* addPlayerSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/player_add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(addPlayerSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(addPlayerFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addPlayerFailure(error?.response));
  }
}
export function* getRulesSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      'cms/rules',
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getRulesSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getRulesFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getRulesFailure(error?.response));
  }
}
export function* getAboutSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      'cms/about',
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getAboutSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getAboutFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getAboutFailure(error?.response));
  }
}
export function* getFaqSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      'faq/list',
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getFaqSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getFaqFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getFaqFailure(error?.response));
  }
}

export function* locationListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/location_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(locationListSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(locationListFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(locationListFailure(error?.response));
  }
}
export function* locationDeleteSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/location_delete',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(locationDeleteSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(locationDeleteFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(locationDeleteFailure(error?.response));
  }
}
export function* addLocationSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/location_add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(addLocationSucces(response?.data));
      CustomToast(response?.data?.message);
    } else if (response?.data?.status == 201) {
      yield put(addLocationFailure(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(addLocationFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addLocationFailure(error?.response));
  }
}
export function* getCmsPageContentSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'cms/details',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getCmsPageContentSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getCmsPageContentFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(getCmsPageContentFailure(error?.response));
  }
}
export function* searchPlayerListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/player_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(searchPlayerListSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(searchPlayerListFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(searchPlayerListFailure(error?.response));
  }
}



export function* addToPlayerSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/team_player_add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(addToPlayerSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(addToPlayerFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addToPlayerFailure(error?.response));
  }
}

export function* addToLocationSaga(action) {

  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/my-location_add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(addToLocationSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(addToLocationFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(addToLocationFailure(error?.response));
  }
}

export function* locationEditSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/location_edit',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(locationEditSucces(response?.data));
      CustomToast(response?.data?.message);
    } else if (response?.data?.status == 201) {
      yield put(locationEditFailure(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(locationEditFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(locationEditFailure(error?.response));
  }
}
export function* searchLocationListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/all_public_location',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(searchLocationListSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(searchLocationListFailure(response?.data));
      // CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(searchLocationListFailure(error?.response));
  }
}

export function* userLocationListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/location_list',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(userLocationSucces(response?.data));
      console.log(response?.data, "response?.data")
      // CustomToast(response?.data?.message);
    } else {
      yield put(userLocationFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(userLocationFailure(error?.response));
  }
}



export function* allPublicLocationListSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'location/all_public_location',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(allPublicLocationSucces(response?.data));
      console.log(response?.data, "response?.data")
      // CustomToast(response?.data?.message);
    } else {
      yield put(allPublicLocationFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(allPublicLocationFailure(error?.response));
  }
}
export function* updateScoreSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'session/score',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(updateScoreSucces(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(updateScoreFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(updateScoreFailure(error?.response));
  }
}


export function* getStaticsSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      'user/user-dashboard',
      header,
    );

    if (response?.data?.status == 200) {
      yield put(getStaticsSucces(response?.data));
    } else {
      yield put(getStaticsFailure(response?.data));
    }
  } catch (error) {
    yield put(getStaticsFailure(error?.response));
  }
}


export function* getLeaderBoardSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/leader-board',
      action.payload,
      header,
      
      
    );

    if (response?.data?.status == 200) {
      yield put(getLeaderBoardSucces(response?.data));
    } else {
      yield put(getLeaderBoardFailure(response?.data));
    }
  } catch (error) {
    yield put(getLeaderBoardFailure(error?.response));
  }
}


export function* submitContactSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'contact/add',
      action.payload,
      header,
    );

    if (response?.data?.status == 200) {
      yield put(submitContactSucces(response?.data));
      CustomToast(response?.data?.message)
    } else {
      yield put(submitContactFailure(response?.data));
    }
  } catch (error) {
    yield put(submitContactFailure(error?.response));
  }
}


const watchFunction = [

  (function* () {
    yield takeLatest('CMS/getPlayerReq', getPlayerSaga);
  })(),

  (function* () {
    yield takeLatest('CMS/deletePlayerReq', deletePlayerSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/addPlayerReq', addPlayerSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getRulesReq', getRulesSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getAboutReq', getAboutSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getFaqReq', getFaqSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/locationListReq', locationListSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/locationDeleteReq', locationDeleteSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/addLocationReq', addLocationSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getCmsPageContentreq', getCmsPageContentSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/searchPlayerListReq', searchPlayerListSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/addToPlayerReq', addToPlayerSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/locationEditReq', locationEditSaga);
  })(),

  (function* () {
    yield takeLatest('CMS/searchLocationListReq', searchLocationListSaga);
  })(),

  (function* () {
    yield takeLatest('CMS/addToLocationReq', addToLocationSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/userLocationReq', userLocationListSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/allPublicLocationReq', allPublicLocationListSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/updateScoreReq', updateScoreSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getStaticsReq', getStaticsSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/getLeaderBoardReq', getLeaderBoardSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/submitContactReq', submitContactSaga);
  })(),
];

export default watchFunction;
