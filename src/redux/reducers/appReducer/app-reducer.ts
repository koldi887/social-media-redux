import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux-store";

let initialState = {
  initialized: false,
  error: null as null | string,
};

const appSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    initializedSuccess: (state) => {
      state.initialized = true;
    },
    initializedError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { initializedSuccess, initializedError } = appSlice.actions;
export const initializeSelector = (state: RootState) => state.app;
export default appSlice.reducer;
