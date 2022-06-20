import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    username: "",
    password: "",
  },
  reducers: {
    login(state, action) {
      const loginData = action.payload;
      state.username = loginData.username;
      state.password = loginData.password;
      console.log(loginData)
    },
    logout() {},
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
