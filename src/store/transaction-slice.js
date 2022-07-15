import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    datas: [],
    accountId: "",
    transactionTypeId: "",
    transactionTypeName: "",
    transactionAmount: "",
    accountTypeName: "",
    status: "pending",
    transactionDate: "",
    description: "",
    errorMsg: "",
    successMsg: "",
  },
  reducers: {
    postTransactionData(state, action) {
      if (action.payload.accountId !== null) {
        state.accountId = action.payload.accountId;
      }
      state.transactionTypeId = action.payload.transactionTypeId;
      state.transactionAmount = action.payload.transactionAmount;
      state.transactionDate = new Date().toString();
      state.description = action.payload.description;
      state.status="completed"
      state.errorMsg="";
      state.successMsg=""
    },
    submitTransaction(state, action) {
      if (action.payload.errorMsg === true) {
        state.errorMsg = "All * field are Required  !!";
        state.successMsg = "";
      } else {
        state.successMsg = "Transaction completed";
        state.errorMsg = "";
        state.transactionTypeId = "";
        state.transactionAmount = "";
        state.transactionDate = "";
        state.description = "";
        state.accountType="";
        state.status = ""
      }
    },
  },
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer;
