import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  token: null,
  isLoading: true,
  error: {},
  forgotPasswordRes: {},
  forgotOTPValidateRes: {},
  userRegisterRes: {},
  resetPasswordRes: {},
  reSendOtpRes: {},
  getUserProfileRes: {},
  verifyEmailRes: {},
  emailExitRes: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,

  reducers: {
    //TOKEN
    getTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    //login
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.token = action?.payload?.token;
      state.status = action.type;
    },
    emailExistSuccess(state, action) {
      state.emailExitRes = action?.payload;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //logoutReq
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.token = action?.payload?.token;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //forgotPasswordReq
    forgotPasswordReq(state, action) {
      state.status = action.type;
    },
    forgotPasswordSucces(state, action) {
      state.forgotPasswordRes = action?.payload;
      state.status = action.type;
    },
    forgotPasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //forgotOTPValidateReq
    forgotOTPValidateReq(state, action) {
      state.status = action.type;
    },
    forgotOTPValidateSucces(state, action) {
      state.forgotOTPValidateRes = action?.payload;
      state.status = action.type;
    },
    forgotOTPValidateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //userRegisterReq
    userRegisterReq(state, action) {
      state.status = action.type;
    },
    userRegisterSucces(state, action) {
      state.userRegisterRes = action?.payload;
      state.status = action.type;
    },
    userRegisterFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //resetPasswordReq
    resetPasswordReq(state, action) {
      state.status = action.type;
    },
    resetPasswordSucces(state, action) {
      state.resetPasswordRes = action?.payload;
      state.status = action.type;
    },
    resetPasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //reSendOtpReq
    reSendOtpReq(state, action) {
      state.status = action.type;
    },
    reSendOtpSucces(state, action) {
      state.reSendOtpRes = action?.payload;
      state.status = action.type;
    },
    reSendOtpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getUserProfileReq
    getUserProfileReq(state, action) {
      state.status = action.type;
    },
    getUserProfileSuccess(state, action) {
      state.getUserProfileRes = action?.payload;
      state.status = action.type;
    },
    getUserProfileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //verifyEmailReq
    verifyEmailReq(state, action) {
      state.status = action.type;
    },
    verifyEmailSucces(state, action) {
      state.verifyEmailRes = action?.payload;
      state.status = action.type;
    },
    verifyEmailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    socialSigninSignupReq(state, action) {
      state.status = action.type;
    },
    socialSigninSignupSuccess(state, action) {
      state.token = action?.payload?.token;
      state.status = action.type;
    },

    socialSigninSignupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,

  loginRequest,
  loginSuccess,
  emailExistSuccess,
  loginFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  forgotPasswordReq,
  forgotPasswordSucces,
  forgotPasswordFailure,

  forgotOTPValidateReq,
  forgotOTPValidateSucces,
  forgotOTPValidateFailure,

  userRegisterReq,
  userRegisterSucces,
  userRegisterFailure,

  resetPasswordReq,
  resetPasswordSucces,
  resetPasswordFailure,

  reSendOtpReq,
  reSendOtpSucces,
  reSendOtpFailure,

  getUserProfileReq,
  getUserProfileSuccess,
  getUserProfileFailure,

  verifyEmailReq,
  verifyEmailSucces,
  verifyEmailFailure,

  socialSigninSignupReq,
  socialSigninSignupSuccess,
  socialSigninSignupFailure,

} = AuthSlice.actions;

export default AuthSlice.reducer;
