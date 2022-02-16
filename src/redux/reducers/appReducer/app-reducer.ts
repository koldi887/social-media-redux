import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux-store";
import { getAuthUserData } from "../authReducer/auth-reducer";

let initialState = {
  initialized: false,
  error: null as null | string,
};

export const initializeApp = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("init/initializeApp", async function (_, { dispatch }) {
  const promise = dispatch(getAuthUserData());
  console.log(promise);
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
});

const appSlice = createSlice({
  name: "app",
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
