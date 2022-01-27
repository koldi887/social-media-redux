import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './redux-store';
import { IDialog, IDialogMessage, IDialogWithUser } from '../types/IDialogs';
import { dialogsApi } from '../api/dialogs-api';

export interface IDialogsPageState {
  dialogs: IDialogMessage[];
}

const initialState: IDialogsPageState = {
  dialogs: [],
};

const dialogPageSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(dialogsApi.endpoints.getDialogWithUser.matchFulfilled, (state, action) => {
      state.dialogs = action.payload;
    });
  },
});

export const {} = dialogPageSlice.actions;
export const dialogsSelector = (state: RootState) => state.dialogsPage;
export default dialogPageSlice.reducer;
