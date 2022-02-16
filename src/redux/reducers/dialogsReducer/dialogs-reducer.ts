import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux-store";
import { IDialogMessage } from "../../../types/IDialogs";
import { dialogsApi } from "../../../api/dialogs-api";

const initialState = {
  dialogs: [] as IDialogMessage[],
};

const dialogPageSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      dialogsApi.endpoints.getDialogWithUser.matchFulfilled,
      (state, action) => {
        state.dialogs = action.payload;
      }
    );
  },
});

export const {} = dialogPageSlice.actions;
export const dialogsSelector = (state: RootState) => state.dialogsPage;
export default dialogPageSlice.reducer;
