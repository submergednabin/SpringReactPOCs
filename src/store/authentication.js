import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    errorMsg: "",
    successMsg: "",
    mandatoryErr: "",
    username: "",
    password: "",
  },
  reducers: {
    checkField(state, action) {
      const name = action.payload
        if(name.username.length < 2 ){
          state.errorMsg = "The username must have atleast 2 letters"
          state.username = ""
        }else {
            state.errorMsg = ""
            state.username= action.payload.username
        }
         if(name.password.length < 2){
          state.errorMsg = "The password must have atleast 2 letters"
          state.password= ""
        }

        else {
          state.errorMsg = ""
          state.password=action.payload.password
        }
    },
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
