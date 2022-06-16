import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
    name:"signup",
    initialState:{},
    reducers:{
        register(){},
    }
});

export const signUpActions = signUpSlice.actions;
export default signUpSlice.reducer;