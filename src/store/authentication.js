import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
    name:"auth",
    initialState: {
        errorMsg:"",
        successMsg:"",
        mandatoryErr:"",
    },
    reducers:{
        checkField(state){}
    }

});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;