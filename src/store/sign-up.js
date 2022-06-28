import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
    name:"signup",
    initialState:{
        isAuthentiated: false,
        email:"",
        username:"",
        password:'',
        city:"",
        firstName:'',
        lastName:'',
        middleName:'',
        zipCcode:'',
        state:'',
        country:''

    },
    reducers:{
        register(state, action){
            const signup = action.payload;
            console.log(signup);
        },
    }
});

export const signUpActions = signUpSlice.actions;
export default signUpSlice.reducer;