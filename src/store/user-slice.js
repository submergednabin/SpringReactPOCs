import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails:[],
    id:"",
    firstName:"",
    middleName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    state:"",
    zipCode:"",
    country:"",
    city:"",
    userErr:"",
  },
  reducers: {
    loadUserDetails(state, action) {
        console.log("user actions", action.payload)
        state.userDetails = action.payload.userDetails
        state.id=action.payload.id
        state.firstName=action.payload.userDetails.firstName
        state.middleName=action.payload.userDetails.middleName
        state.lastName=action.payload.userDetails.lastName
        state.email=action.payload.userDetails.email
        state.country= action.payload.userDetails.data.name
        state.city= action.payload.userDetails.city
        state.phoneNumber=action.payload.userDetails.phoneNumber
        state.zipCode=action.payload.userDetails.zipCode
        state.state=action.payload.userDetails.state.name
        
    },
    setErrorMsg(state, action){
        state.userErr = action.payload
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
