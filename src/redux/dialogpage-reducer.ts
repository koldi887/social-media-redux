import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./redux-store";

interface IDialogsData {
  id: number;
  name: string;
  color: object;
  tag: string;
}

interface IDialogsMessage {
  tag: string;
  color: object;
  text: string;
}

export interface IDialogsPageState {
  dialogsData: IDialogsData[];
  dialogsMessages: IDialogsMessage[];
}

const initialState: IDialogsPageState = {
  dialogsData: [
    { id: 1, name: "Dmitri", color: { background: "#7e57c2" }, tag: "DK" },
    { id: 2, name: "Aleksei", color: { background: "#ef5350" }, tag: "AK" },
    { id: 3, name: "Samuel", color: { background: "#ab47bc" }, tag: "SL" },
    { id: 4, name: "Richard", color: { background: "#42a5f5" }, tag: "RD" },
    { id: 5, name: "Tom", color: { background: "#29b6f6" }, tag: "TF" },
    { id: 6, name: "Vladimir", color: { background: "#26a69a" }, tag: "VL" },
    { id: 7, name: "Marc", color: { background: "#78909c" }, tag: "MB" },
    { id: 8, name: "David", color: { background: "#ffa726" }, tag: "DF" },
  ],
  dialogsMessages: [
    {
      tag: "DK",
      color: { background: "#7e57c2" },
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      tag: "TF",
      color: { background: "#29b6f6" },
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
  ],
};

const dialogPageSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    addDialogMessage: (state, action: PayloadAction<string>) => {
      state.dialogsMessages.push({
        tag: "DK",
        color: { background: "#7e57c2" },
        text: action.payload,
      });
    },
  },
});

export const { addDialogMessage } = dialogPageSlice.actions;
export const dialogsSelector = (state: RootState) => state.dialogsPage;
export default dialogPageSlice.reducer;
