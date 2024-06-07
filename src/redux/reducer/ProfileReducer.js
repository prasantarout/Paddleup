import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: {},
    error: {},
    getProfileDetailsRes: {},
    updateProfileRes: {},
    changePassswordRes: {},
    deleteProfileres: {},
};

const ProfileReducer = createSlice({
    name: 'Profile',
    initialState,

    reducers: {

        getProfileDetailsReq(state, action) {
            state.status = action.type;
        },
        getProfileDetailsSucces(state, action) {
            state.getProfileDetailsRes = action?.payload;
            state.status = action.type;
        },
        getProfileDetailsFailure(state, action) {
            state.error = action.error;
            state.status = action.type;
        },
        updateProfileReq(state, action) {
            state.status = action.type;
        },
        updateProfileSucces(state, action) {
            state.updateProfileRes = action?.payload;
            state.status = action.type;
        },
        updateProfileFailure(state, action) {
            state.error = action.error;
            state.status = action.type;
        },
        changePassswordReq(state, action) {
            state.status = action.type;
        },
        changePassswordSucces(state, action) {
            state.changePassswordRes = action?.payload;
            state.status = action.type;
        },
        changePassswordFailure(state, action) {
            state.error = action.error;
            state.status = action.type;
        },
        deleteProfilereq(state, action) {
            state.status = action.type;
        },
        deleteProfileSucces(state, action) {
            state.deleteProfileres = action?.payload;
            state.status = action.type;
        },
        deleteProfileFailure(state, action) {
            state.error = action.error;
            state.status = action.type;
        },
    },
});

export const {
    getProfileDetailsReq,
    getProfileDetailsSucces,
    getProfileDetailsFailure,

    updateProfileReq,
    updateProfileSucces,
    updateProfileFailure,


    changePassswordReq,
    changePassswordSucces,
    changePassswordFailure,

    deleteProfilereq,
    deleteProfileSucces,
    deleteProfileFailure,
    


} = ProfileReducer.actions;

export default ProfileReducer.reducer;
