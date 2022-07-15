import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    datas: [], //this array is to store the account details information once the page is loaded
    accountData: [], // here we load the array of account type information
    totalAccounts: "",
    accountType: "",
    accountName: "",
    userId: "",
    username: "",
    depositedAmount: "",
    dateCreated: "",
    msg: "",
    accountId: "",
    isValidUser: false,
  },
  reducers: {
    createAccount(state, action) {
      state.totalAccounts = action.payload.totalAccounts;
      state.userId = action.payload.userId;
      state.datas = action.payload.data;
      state.dateCreated = new Date().toString();
    },
    loadAccountData(state, action) {
      state.accountData = action.payload;
    },
    handleAccount(state, action) {
      state.accountType = action.payload.accountType;
      state.userId = action.payload.userId;
      state.depositedAmount = action.payload.depositedAmount;
      state.accountId = action.payload.accountId;
      state.msg = "";
    },
    // After account is submitted,
    cleanAccountField(state, action) {
      state.msg = action.payload;
      state.accountType = "";
      state.accountName = "";
      state.depositedAmount = "";
      state.dateCreated = "";
    },
    checkValidUser(state, action) {
      state.isValidUser = action.payload;
    },
  },
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;
