import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './login-slice';
import signUpReducer from './sign-up';
import authReducer from './authentication';

const store = configureStore({
    reducer: { login: loginReducer, signup: signUpReducer, auth: authReducer }
});


export default store;

