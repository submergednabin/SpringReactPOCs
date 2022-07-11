import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name:"transaction",
    initialState:{
        datas:[],
        accountId:"",
        transactionTypeId:"",
        transactionTypeName:"",
        transactionAmount:"",
        accountTypeName:"",
    },
    reducers:{
        postTransactionData(state,action){
            if(action.payload.accountId !== null){

                state.accountId=action.payload.accountId;
            }
            state.transactionTypeId=action.payload.transactionType;
            // state.accountTypeName=action.payload.accountType;
        },

    }
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer;