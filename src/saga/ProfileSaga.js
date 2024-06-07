import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
    getProfileDetailsSucces,
    getProfileDetailsFailure,
    updateProfileSucces,
    updateProfileFailure,
    changePassswordSucces,
    changePassswordFailure,

    deleteProfileSucces,
    deleteProfileFailure,
} from '../redux/reducer/ProfileReducer';

import { getApi, postApi } from '../utils/helpers/ApiRequest';

import CustomToast from '../utils/helpers/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../utils/helpers/constants';
import { getTokenSuccess, logoutSuccess } from '../redux/reducer/AuthReducer';

let getItem = state => state.AuthReducer;

export function* getProfileDetailsSaga(action) {
    let item = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: item.token,
    };
    try {
        let response = yield call(
            getApi,
            'user/details',
            // action.payload,
            header,
        );

        if (response?.data?.status == 200) {
            yield put(getProfileDetailsSucces(response?.data));
            // Toast(response?.data?.message);
        } else {
            yield put(getProfileDetailsFailure(response?.data));
            Toast(response?.data?.message);
        }
    } catch (error) {
        yield put(getProfileDetailsFailure(error?.response));
    }
}
export function* updateProfileSaga(action) {
    let item = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
        accesstoken: item.token,
    };
    try {
        let response = yield call(
            postApi,
            'user/update-profile',
            action.payload,
            header,
        );

        if (response?.data?.status == 200) {
            yield put(updateProfileSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(updateProfileFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(updateProfileFailure(error?.response));
    }
}

export function* changePassswordSaga(action) {
    let item = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
        accesstoken: item.token,
    };
    try {
        let response = yield call(
            postApi,
            'user/change-password',
            action.payload,
            header,
        );

        if (response?.data?.status == 200) {
            yield put(changePassswordSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(changePassswordFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(changePassswordFailure(error?.response));
    }
}

export function* deleteProfileSaga(action) {
    let item = yield select(getItem);
    let header = {
        Accept: 'application/json',
        // contenttype: 'multipart/form-data',
        accesstoken: item.token,
    };
    try {
        let response = yield call(
            postApi,
            'user/delete',
            action.payload,
            header,
        );

        console.log(response,'responseresponseresponse')
        if (response?.data?.status == 200) {
            yield put(deleteProfileSucces(response?.data));
            yield call(AsyncStorage.removeItem, constants.APPTOKEN);

            yield put(getTokenSuccess(null));
            yield put(logoutSuccess('logout'));
            CustomToast(response?.data?.message);
        } else {
            yield put(deleteProfileFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        console.log(error,'responseresponseresponse error')
        yield put(deleteProfileFailure(error?.response));
    }
}
const watchFunction = [
    (function* () {
        yield takeLatest('Profile/getProfileDetailsReq', getProfileDetailsSaga);
    })(),
    (function* () {
        yield takeLatest('Profile/updateProfileReq', updateProfileSaga);
    })(),
    (function* () {
        yield takeLatest('Profile/changePassswordReq', changePassswordSaga);
    })(),
    (function* () {
        yield takeLatest('Profile/deleteProfilereq', deleteProfileSaga);
    })(),
];

export default watchFunction;
