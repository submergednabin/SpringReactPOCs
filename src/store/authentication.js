import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    errorMsg: "",
    successMsg: "",
    mandatoryErr: "",
    username: "",
    password: "",
    userError: "",
    pwdError: "",
  },
  reducers: {
    checkField(state, action) {
      const name = action.payload;
      if (name.username.trim() !== "" && name.username.length < 2) {
        state.userError = "The username must have atleast 2 letters";
        state.username = "";
      } else {
        state.errorMsg = "";
        state.userError = "";
        state.username = action.payload.username;
      }
      if (name.password.trim() !== "" && name.password.length < 2) {
        state.pwdError = "The password must have atleast 2 letters";
        state.password = "";
      } else {
        state.pwdError = "";
        state.password = action.payload.password;
      }
    },
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
