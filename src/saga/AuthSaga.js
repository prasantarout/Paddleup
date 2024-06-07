import { call, put, select, takeLatest } from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    getTokenSuccess,
    getTokenFailure,
    loginSuccess,
    emailExistSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    forgotPasswordSucces,
    forgotPasswordFailure,
    forgotOTPValidateSucces,
    forgotOTPValidateFailure,
    userRegisterSucces,
    userRegisterFailure,
    resetPasswordSucces,
    resetPasswordFailure,
    reSendOtpSucces,
    reSendOtpFailure,
    getUserProfileSuccess,
    getUserProfileFailure,
    verifyEmailSucces,
    verifyEmailFailure,

    socialSigninSignupSuccess,
    socialSigninSignupFailure,

} from '../redux/reducer/AuthReducer';
import { getApi, postApi } from '../utils/helpers/ApiRequest';

import CustomToast from '../utils/helpers/CustomToast';
import constants from '../utils/helpers/constants';

let getItem = state => state.AuthReducer;

//token
export function* getTokenSaga() {
    //   let item = yield select(getItem);
    try {
        const response = yield call(AsyncStorage.getItem, constants.APPTOKEN);

        if (response != null) {
            yield put(getTokenSuccess(response));
        } else {
            yield put(getTokenSuccess(null));
        }
    } catch (error) {
        yield put(getTokenFailure(error));
    }
}
//login
export function* loginSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/signin',
            action.payload,
            header,
        );
        if (response?.data?.status == 200) {
            if (action.payload?.isRemember == true) {
                yield call(
                    AsyncStorage.setItem, 'uEmail',
                    action.payload?.email
                );
                yield call(
                    AsyncStorage.setItem, 'uPass',
                    action.payload?.password
                );
            } else {
                yield call(AsyncStorage.removeItem, 'uEmail');
                yield call(AsyncStorage.removeItem, 'uPass');
            }
            yield call(
                AsyncStorage.setItem,
                constants.APPTOKEN,
                response?.data?.token,
            );
            yield put(loginSuccess(response?.data));
            CustomToast(response?.data?.message);
            yield put(getTokenSuccess(response?.data?.token));
        } else if (response?.data?.status == 202) {
            yield put(emailExistSuccess(response?.data));
            CustomToast(response?.data?.message);

        } else {
            yield put(loginFailure(response?.data));
            CustomToast(response?.data?.message);
            console.log(response)
        }
    } catch (error) {

        yield put(loginFailure(error?.response));
    }
}
//user/socialSigninSignup
export function* socialSigninSignupSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/socialSigninSignup',
            action.payload,
            header,
        );
        if (response?.data?.status == 200) {
            if (action.payload?.isRemember == true) {
                yield call(
                    AsyncStorage.setItem, 'uEmail',
                    action.payload?.email
                );
                yield call(
                    AsyncStorage.setItem, 'uPass',
                    action.payload?.password
                );
            } else {
                yield call(AsyncStorage.removeItem, 'uEmail');
                yield call(AsyncStorage.removeItem, 'uPass');
            }
            yield call(
                AsyncStorage.setItem,
                constants.APPTOKEN,
                response?.data?.token,
            );
            yield put(socialSigninSignupSuccess(response?.data));
            CustomToast(response?.data?.message);
            yield put(getTokenSuccess(response?.data?.token));
        } else {
            yield put(socialSigninSignupFailure(response?.data));
            CustomToast(response?.data?.message);
            console.log(response)
        }
    } catch (error) {

        yield put(loginFailure(error?.response));
    }
}

export function* logoutSaga(action) {
    try {
        yield call(AsyncStorage.removeItem, constants.APPTOKEN);

        yield put(getTokenSuccess(null));
        yield put(logoutSuccess('logout'));
        CustomToast('Logout successfully');
    } catch (error) {
        yield put(logoutFailure(error));
    }
}

//forgot password
export function* forgotPasswordSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/forget-password-request',
            action.payload,
            header,
        );
        if (response?.data?.status == 200) {
            console.log(response, "response")
            yield put(forgotPasswordSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(forgotPasswordFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(forgotPasswordFailure(error?.response));
    }
}
//forget-password-otp-validate
export function* forgotOTPValidateSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/forget-password-verify',
            action.payload,
            header,
        );
        if (response?.data?.status == 200) {

            yield put(forgotOTPValidateSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(forgotOTPValidateFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(forgotOTPValidateFailure(error?.response));
    }
}
//register
export function* userRegisterSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/signup',
            action.payload,
            header,
        );

        if (response?.data?.status == 200 || response?.data?.status == 202) {
            // yield call(
            //     AsyncStorage.setItem,
            //     constants.APPTOKEN,
            //     response?.data?.token,
            // );
            // yield put(loginSuccess(response?.data));
            yield put(userRegisterSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(userRegisterFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(userRegisterFailure(error?.response));
    }
}
//user/email-verify
export function* verifyEmailSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/email-verify',
            action.payload,
            header,
        );

        if (response?.data?.status == 200) {
            yield put(verifyEmailSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(verifyEmailFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(verifyEmailFailure(error?.response));
    }
}
//resetPassword
export function* resetPasswordSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
        accesstoken: action?.payload?.token
    };
    try {
        let response = yield call(
            postApi,
            'user/reset-password',
            action.payload,
            header,
        );

        if (response?.data?.status == 200) {
            yield put(resetPasswordSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(resetPasswordFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(resetPasswordFailure(error?.response));
    }
}
//re-send otp
export function* reSendOtpSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    };
    try {
        let response = yield call(
            postApi,
            'user/resend-otp',
            action.payload,
            header,
        );
        if (response?.data?.status == 200) {
            yield put(reSendOtpSucces(response?.data));
            CustomToast(response?.data?.message);
        } else {
            yield put(reSendOtpFailure(response?.data));
            CustomToast(response?.data?.message);
        }
    } catch (error) {
        yield put(reSendOtpFailure(error?.response));
    }
}


//getUserProfile
export function* getUserProfileSaga(action) {
    let item = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: item.token,
    };
    try {
        let response = yield call(
            getApi,
            'user',
            // action.payload,
            header,
        );
        if (response?.data?.status == true) {
            yield put(getUserProfileSuccess(response?.data));
        } else {
            yield put(getUserProfileFailure(response?.data));
        }
    } catch (error) {

        yield put(getUserProfileFailure(error?.response));
    }
}
const watchFunction = [
    (function* () {
        yield takeLatest('Auth/getTokenRequest', getTokenSaga);
    })(),

    (function* () {
        yield takeLatest('Auth/loginRequest', loginSaga);
    })(),

    (function* () {
        yield takeLatest('Auth/logoutRequest', logoutSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/forgotPasswordReq', forgotPasswordSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/forgotOTPValidateReq', forgotOTPValidateSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/userRegisterReq', userRegisterSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/resetPasswordReq', resetPasswordSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/reSendOtpReq', reSendOtpSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/getUserProfileReq', getUserProfileSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/verifyEmailReq', verifyEmailSaga);
    })(),
    (function* () {
        yield takeLatest('Auth/socialSigninSignupReq', socialSigninSignupSaga);
    })(),

];

export default watchFunction;
