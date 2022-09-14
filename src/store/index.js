import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login-slice";
import signUpReducer from "./sign-up";
import authReducer from "./authentication";
import accountReducer from "./account-slice";
import transactionReducer from "./transaction-slice";
import statementReducer from "./statement-slice";
import userReducer from "./user-slice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signUpReducer,
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    statement: statementReducer,
    user: userReducer,
  },
});

export default store;
