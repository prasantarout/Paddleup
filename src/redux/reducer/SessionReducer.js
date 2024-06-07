import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  sessionDetailsResponse: {},
  courtDetailsResponse: {},
  gameDetailsResponse: {},
  getSessionListRes: {},
  getSessDetailsRes: {},
  sessionDeleteRes: {},
  sessionEndRes: {},
  scoreHistoryRes: {},
};

const sessionReducer = createSlice({
  name: 'Session',
  initialState,

  reducers: {
    addSessionDetailsReq(state, action) {
      state.status = action.type;
    },
    addSessionDetailsSuccess(state, action) {
      state.sessionDetailsResponse = action?.payload;
      state.status = action.type;
    },
    addSessionDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    addCourtsDetailsReq(state, action) {
      state.status = action.type;
    },
    addCourtsDetailsSuccess(state, action) {
      state.courtDetailsResponse = action?.payload;
      state.status = action.type;
    },
    addCourtsDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //game mode
    getGameDetailsReq(state, action) {
      state.status = action.type;
    },
    getGameDetailsSuccess(state, action) {
      state.gameDetailsResponse = action?.payload;
      state.status = action.type;
    },
    getGameDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },


    //get session req
    getSessionListReq(state, action) {
      state.status = action.type;
    },
    getSessionListSuccess(state, action) {
      state.getSessionListRes = action?.payload;
      state.status = action.type;
    },
    getSessionListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //get session details
    getSessDetailsReq(state, action) {
      state.status = action.type;
    },
    getSessDetailsSuccess(state, action) {
      state.getSessDetailsRes = action?.payload;
      state.sessionDetailsResponse = action?.payload;
      state.status = action.type;
    },
    getSessDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //get session details
    sessionDeleteReq(state, action) {
      state.status = action.type;
    },
    sessionDeleteSuccess(state, action) {
      state.sessionDeleteRes = action?.payload;
      state.status = action.type;
    },
    sessionDeleteFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //sessionEndReq
    sessionEndReq(state, action) {
      state.status = action.type;
    },
    sessionEndSuccess(state, action) {
      state.sessionEndRes = action?.payload;
      state.status = action.type;
    },
    sessionEndFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //scoreHistoryReq
    scoreHistoryReq(state, action) {
      state.status = action.type;
    },
    scoreHistorySuccess(state, action) {
      state.scoreHistoryRes = action?.payload;
      state.status = action.type;
    },
    scoreHistoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  addSessionDetailsReq,
  addSessionDetailsSuccess,
  addSessionDetailsFailure,

  addCourtsDetailsReq,
  addCourtsDetailsSuccess,
  addCourtsDetailsFailure,

  getGameDetailsReq,
  getGameDetailsSuccess,
  getGameDetailsFailure,


  getSessionListReq,
  getSessionListSuccess,
  getSessionListFailure,


  getSessDetailsReq,
  getSessDetailsSuccess,
  getSessDetailsFailure,

  sessionDeleteReq,
  sessionDeleteSuccess,
  sessionDeleteFailure,

  sessionEndReq,
  sessionEndSuccess,
  sessionEndFailure,

  scoreHistoryReq,
  scoreHistorySuccess,
  scoreHistoryFailure,



} = sessionReducer.actions;

export default sessionReducer.reducer;
