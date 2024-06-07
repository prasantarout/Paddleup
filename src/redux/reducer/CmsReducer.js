import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getPlayerRes: {},
  deletePlayerRes: {},
  addPlayerRes: {},
  getRulesRes: {},
  getAboutRes: {},
  getFaqRes: {},
  locationListRes: {},
  locationDeleteRes: {},
  addLocationRes: {},
  getCmsPageContentres: {},
  searchPlayerListRes: {},
  addToPlayerRes: {},
  locationEditRes: {},
  searchLocationListres: {},
  addToLocationRes: {},
  userLocationListRes: {},
  allPublicLocationRes: {},
  updateScoreRes: {},
  getStaticsRes: {},
  getLeaderBoardRes: {},
  submitContactRes: {},

};

const CmsSlice = createSlice({
  name: 'CMS',
  initialState,

  reducers: {

    //getPlayerReq
    getPlayerReq(state, action) {
      state.status = action.type;
    },
    getPlayerSucces(state, action) {
      state.getPlayerRes = action?.payload;
      state.status = action.type;
    },
    getPlayerFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //deletePlayerReq
    deletePlayerReq(state, action) {
      state.status = action.type;
    },
    deletePlayerSucces(state, action) {
      state.deletePlayerRes = action?.payload;
      state.status = action.type;
    },
    deletePlayerFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //addPlayerReq
    addPlayerReq(state, action) {
      state.status = action.type;
    },
    addPlayerSucces(state, action) {
      state.addPlayerRes = action?.payload;
      state.status = action.type;
    },
    addPlayerFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getRulesReq
    getRulesReq(state, action) {
      state.status = action.type;
    },
    getRulesSucces(state, action) {
      state.getRulesRes = action?.payload;
      state.status = action.type;
    },
    getRulesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getAboutReq
    getAboutReq(state, action) {
      state.status = action.type;
    },
    getAboutSucces(state, action) {
      state.getAboutRes = action?.payload;
      state.status = action.type;
    },
    getAboutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getFaqReq
    getFaqReq(state, action) {
      state.status = action.type;
    },
    getFaqSucces(state, action) {
      state.getFaqRes = action?.payload;
      state.status = action.type;
    },
    getFaqFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //locationListReq
    locationListReq(state, action) {
      state.status = action.type;
    },
    locationListSucces(state, action) {
      state.locationListRes = action?.payload;
      state.status = action.type;
    },
    locationListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //locationDeleteReq
    locationDeleteReq(state, action) {
      state.status = action.type;
    },
    locationDeleteSucces(state, action) {
      state.locationDeleteRes = action?.payload;
      state.status = action.type;
    },
    locationDeleteFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //addLocationReq
    addLocationReq(state, action) {
      state.status = action.type;
    },
    addLocationSucces(state, action) {
      state.addToLocationRes = action?.payload;
      state.status = action.type;
    },
    addLocationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getCmsPageContentreq
    getCmsPageContentreq(state, action) {
      state.status = action.type;
    },
    getCmsPageContentSucces(state, action) {
      state.getCmsPageContentres = action?.payload;
      state.status = action.type;
    },
    getCmsPageContentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getCmsPageContentreq
    searchPlayerListReq(state, action) {
      state.status = action.type;
    },
    searchPlayerListSucces(state, action) {
      state.searchPlayerListRes = action?.payload;
      state.status = action.type;
    },
    searchPlayerListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },



    searchLocationListReq(state, action) {
      state.status = action.type;
    },
    searchLocationListSucces(state, action) {
      state.searchLocationListres = action?.payload;
      state.status = action.type;
    },
    searchLocationListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //add to location
    addToLocationReq(state, action) {
      state.status = action.type;
    },
    addToLocationSucces(state, action) {
      state.addToLocationRes = action?.payload;
      state.status = action.type;
    },
    addToLocationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //addToPlayerReq
    addToPlayerReq(state, action) {
      state.status = action.type;
    },
    addToPlayerSucces(state, action) {
      state.addToPlayerRes = action?.payload;
      state.status = action.type;
    },
    addToPlayerFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //locationEditReq
    locationEditReq(state, action) {
      state.status = action.type;
    },
    locationEditSucces(state, action) {
      state.locationEditRes = action?.payload;
      state.status = action.type;
    },
    locationEditFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //UserlocationListReq
    userLocationReq(state, action) {
      state.status = action.type;
    },
    userLocationSucces(state, action) {
      state.userLocationListRes = action?.payload;
      state.status = action.type;
    },
    userLocationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },


    //All public location req
    allPublicLocationReq(state, action) {
      state.status = action.type;
    },
    allPublicLocationSucces(state, action) {
      state.allPublicLocationRes = action?.payload;
      state.status = action.type;
    },
    allPublicLocationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //updateScoreReq
    updateScoreReq(state, action) {
      state.status = action.type;
    },
    updateScoreSucces(state, action) {
      state.updateScoreRes = action?.payload;
      state.status = action.type;
    },
    updateScoreFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getStaticsReq
    getStaticsReq(state, action) {
      state.status = action.type;
    },
    getStaticsSucces(state, action) {
      state.getStaticsRes = action?.payload;
      state.status = action.type;
    },
    getStaticsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //getLeaderBoardReq
    getLeaderBoardReq(state, action) {
      state.status = action.type;
    },
    getLeaderBoardSucces(state, action) {
      state.getLeaderBoardRes = action?.payload;
      state.status = action.type;
    },
    getLeaderBoardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //submitContactReq
    submitContactReq(state, action) {
      state.status = action.type;
    },
    submitContactSucces(state, action) {
      state.submitContactRes = action?.payload;
      state.status = action.type;
    },
    submitContactFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getPlayerReq,
  getPlayerSucces,
  getPlayerFailure,

  deletePlayerReq,
  deletePlayerSucces,
  deletePlayerFailure,

  addPlayerReq,
  addPlayerSucces,
  addPlayerFailure,

  getRulesReq,
  getRulesSucces,
  getRulesFailure,

  getAboutReq,
  getAboutSucces,
  getAboutFailure,

  getFaqReq,
  getFaqSucces,
  getFaqFailure,



  locationDeleteReq,
  locationDeleteSucces,
  locationDeleteFailure,

  addLocationReq,
  addLocationSucces,
  addLocationFailure,

  getCmsPageContentreq,
  getCmsPageContentSucces,
  getCmsPageContentFailure,

  searchPlayerListReq,
  searchPlayerListSucces,
  searchPlayerListFailure,


  addToPlayerReq,
  addToPlayerSucces,
  addToPlayerFailure,

  locationEditReq,
  locationEditSucces,
  locationEditFailure,

  locationListReq,
  locationListSucces,
  locationListFailure,

  searchLocationListReq,
  searchLocationListSucces,
  searchLocationListFailure,

  addToLocationFailure,
  addToLocationSucces,
  addToLocationReq,

  userLocationReq,
  userLocationSucces,
  userLocationFailure,

  allPublicLocationReq,
  allPublicLocationSucces,
  allPublicLocationFailure,

  updateScoreReq,
  updateScoreSucces,
  updateScoreFailure,

  getStaticsReq,
  getStaticsSucces,
  getStaticsFailure,

  getLeaderBoardReq,
  getLeaderBoardSucces,
  getLeaderBoardFailure,


  submitContactReq,
  submitContactSucces,
  submitContactFailure,



} = CmsSlice.actions;

export default CmsSlice.reducer;
