import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    errorMsg: "",
    successMsg: "",
    mandatoryErr: "",
    username: "",
    password: "",
    email: "",
    city: "",
    firstName: "",
    lastName: "",
    middleName: "",
    zipCcode: "",
    state: "",
    country: "",
    userError: "",
    pwdError: "",
    emailErr: "",
    firstNameErr: "",
    lastNameErr: "",
    middleNameErr: "",
    cityErr: "",
    stateErr: "",
    countryErr: "",
    zipCodeErr: "",
  },
  reducers: {
    checkField(state, action) {
      const name = action.payload;
      let validEmailCheck =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (name.username.trim() !== "" && name.username.length < 2) {
        state.userError = "The username must have atleast 2 letters";
        state.username = "";
      }else{
        state.username = action.payload.username;
        state.errorMsg = "";
        state.userError="";
      }
      if (name.password.trim() !== "" && name.password.length < 2) {
        state.pwdError = "The password must have atleast 2 letters";
        state.password = "";
      } else {
        state.password = action.payload.password;
        state.errorMsg = "";
        state.pwdError = "";
      }
      if (name.email.trim() !== "" && name.email.length < 2) {
        state.emailErr =
          "Email is Required or cannot be less than 2 characters";
        state.email = "";
      }
      else if (!validEmailCheck.test(name.email)) {
        state.emailErr = "Invalid email format";
        state.email = "";
      }else{
        state.email = action.payload.email;
        state.errorMsg = "";
        state.emailErr = "";
      }
      if (name.firstName.trim() !== "" && name.firstName.length < 2) {
        state.firstNameErr = "The first Name should have atleast 2 character";
        state.firstName = "";
      }else{
        state.firstName = action.payload.firstName;
        state.errorMsg = "";
        state.firstNameErr = "";
      }
      if (name.lastName.trim() !== "" && name.lastName.length < 2) {
        state.lastNameErr = "The Last Name should have atleast 2 character";
        state.lastName = "";
      }else{
        state.lastName = action.payload.lastName;
        state.errorMsg = "";
        state.lastNameErr = "";
      }

      if (name.middleName.trim() !== "" && name.middleName.length < 2) {
        state.middleNameErr = "The Middle Name should have atleast 2 character";
        state.middleName = "";
      }else {
        state.middleName = action.payload.middleName;
        state.errorMsg = "";
        state.middleNameErr = "";
      }

      if (name.city.trim() !== "" && name.city.length < 2) {
        state.cityErr = "The City should have atleast 2 character";
        state.city = "";
      } else {
        state.city = action.payload.city;
        state.errorMsg = "";
        state.cityErr = "";
      }
      if (name.state.trim() !== "" && name.state.length < 2) {
        state.stateErr = "The State should have atleast 2 character";
        state.state = "";
      } else {
        state.state = action.payload.state;
        state.stateErr = "";
      }
      if (name.country.trim() !== "" && name.country.length < 2) {
        state.countryErr = "The Country should have atleast 2 character";
        state.country = "";
      } else {
        state.country = action.payload.country;
        state.errorMsg = "";
        state.countryErr = "";
      }
    },
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
