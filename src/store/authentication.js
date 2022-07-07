import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isValid:"false",
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
    phoneNumber:"",
    zipCode: "",
    state: "",
    stateId:"",
    countryId:"",
    country: "",
    userError: "",
    pwdError: "",
    emailErr: "",
    phoneErr:"",
    firstNameErr: "",
    lastNameErr: "",
    middleNameErr: "",
    cityErr: "",
    stateErr: "",
    countryErr: "",
    zipCodeErr: "",
  },
  reducers: {
    resetField(state, action){
      
    },
    checkField(state, action) {
      const name = action.payload;
      let validEmailCheck =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (name.username.trim() !== "" && name.username.length < 2) {
        state.userError = "The username must have atleast 2 letters";
        state.username = "";
        state.isValid="true";
      }else{
        state.username = action.payload.username;
        state.errorMsg = "";
        state.userError="";
        state.isValid='false'
      }
      if (name.password.trim() !== "" && name.password.length < 2) {
        state.pwdError = "The password must have atleast 2 letters";
        state.password = "";
        state.isValid='true';
      } else {
        state.password = action.payload.password;
        state.errorMsg = "";
        state.pwdError = "";
        state.isValid='false';
      }
      if (name.phoneNumber.trim() !== "" && name.phoneNumber.length < 10) {
        state.phoneErr = "The Phone Number must have 10 Digit";
        state.phoneNumber = "";
        state.isValid='true';
      } else {
        state.phoneNumber = action.payload.phoneNumber;
        state.errorMsg = "";
        state.phoneErr = "";
        state.isValid='false';
      }
      if (name.email.trim() !== "" && name.email.length < 2) {
        state.emailErr =
          "Email is Required or cannot be less than 2 characters";
        state.email = "";
        state.isValid='true';

      }
      else if (!validEmailCheck.test(name.email)) {
        state.emailErr = "Invalid email format";
        state.email = "";
        state.isValid="true";

      }else{
        state.email = action.payload.email;
        state.errorMsg = "";
        state.emailErr = "";
        // state.isValid=false;

      }
      if (name.firstName.trim() !== "" && name.firstName.length < 2) {
        state.firstNameErr = "The first Name should have atleast 2 character";
        state.firstName = "";
        // state.isValid=true;

      }else{
        state.firstName = action.payload.firstName;
        state.errorMsg = "";
        state.firstNameErr = "";
        // state.isValid=false;

      }
      if (name.lastName.trim() !== "" && name.lastName.length < 2) {
        state.lastNameErr = "The Last Name should have atleast 2 character";
        state.lastName = "";
        // state.isValid=true;

      }else{
        state.lastName = action.payload.lastName;
        state.errorMsg = "";
        state.lastNameErr = "";
        // state.isValid=false;

      }

      if (name.middleName.trim() !== "" && name.middleName.length < 2) {
        state.middleNameErr = "The Middle Name should have atleast 2 character";
        state.middleName = "";
        // state.isValid=true;

      }else {
        state.middleName = action.payload.middleName;
        state.errorMsg = "";
        state.middleNameErr = "";
        // state.isValid=false;

      }

      if (name.city.trim() !== "" && name.city.length < 2) {
        state.cityErr = "The City should have atleast 2 character";
        state.city = "";
        // state.isValid=true;

      } else {
        state.city = action.payload.city;
        state.errorMsg = "";
        state.cityErr = "";
        // state.isValid=false;

      }
      if (name.state.trim() !== "" && name.state.length < 2) {
        state.stateErr = "The State should have atleast 2 character";
        state.state = "";
        state.stateId="";
        // state.isValid=true;

      } else {
        state.state = action.payload.state;
        state.stateId=action.payload.id;
        console.log("state: " + state.stateId)
        state.stateErr = "";
        // state.isValid=false;
      }
      if (name.country.trim() !== "" && name.country.length < 2) {
        state.countryErr = "The Country should have atleast 2 character";
        state.country = "";
        state.countryId="";
        // state.isValid=true;
      } else {
        state.country = action.payload.country;
        state.countryId = action.payload.id;
        console.log("countryId: " + state.countryId)
        state.errorMsg = "";
        state.countryErr = "";
        // state.isValid=false;

      }
      if (name.zipCode.trim() !== "" && name.zipCode.length < 5) {
        state.zipCodeErr = "The Zipcode should have atleast 5 digit";
        state.zipCode = "";
        // state.isValid=true;
      } else {
        state.zipCode = action.payload.zipCode;
        state.errorMsg = "";
        state.zipCodeErr = "";
        // state.isValid=false;
      }
    },
    hasErrorMsg(state, action){
      state.errorMsg = action.payload;
    }
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
