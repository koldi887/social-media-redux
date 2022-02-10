import { getAuthUserData } from "../../auth-reducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux-store";

let initialState = {
  initialized: false
};

export const initializeApp = createAsyncThunk<Promise<void>, void, { dispatch: AppDispatch }>(
  "init/initializeApp",
  async function(_, { dispatch }) {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  }
);

const appSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    initializedSuccess: (state) => {
      state.initialized = true;
    }
  }
});

export const { initializedSuccess } = appSlice.actions;
export const initialSlice = (state: RootState) => state.app;
export default appSlice.reducer;
