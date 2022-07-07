import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './login-slice';
import signUpReducer from './sign-up';
import authReducer from './authentication';
import accountReducer from './account-slice';

const store = configureStore({
    reducer: { login: loginReducer, signup: signUpReducer, auth: authReducer, account: accountReducer }
});


export default store;

