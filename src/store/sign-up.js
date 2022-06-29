import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
    name:"signup",
    initialState:{
        data: [],
        stateList: [],
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
        initialLoad(state, action){
            const countries = action.payload;
            state.data=countries
            // console.log(countries)
        },
        initialStateLoad(state,action){
            const states = action.payload;
            state.stateList = states;
        }
    }
});

export const signUpActions = signUpSlice.actions;
export default signUpSlice.reducer;