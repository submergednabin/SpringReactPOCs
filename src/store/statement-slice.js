import { createSlice } from "@reduxjs/toolkit";

const statementSlice = createSlice({
  name: "statement",
  initialState: {
    datas: [],
    errorMsg: "",
    successMsg: "",
    msg: "",
  },
  reducers: {
    loadStatement(state, action) {
      state.datas = action.payload.data;
    },
  },
});

export const statementAction = statementSlice.actions;
export default statementSlice.reducer;
