import { createAsyncThunk, createSlice, current, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux-store';
import { chatAPI, IChatMessageApi, StatusType } from '../../../api/chat-api';
import { v1 } from 'uuid';

export type ChatMessageType = IChatMessageApi & { id: string };

let _newMessagesHandler: ((messages: IChatMessageApi[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(setUnreadMessages(messages));
      dispatch(setMessages(messages));
    };
  }
  return _newMessagesHandler;
};

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = createAsyncThunk(
  'chat/startMessagesListening',
  async function (_, { dispatch }) {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
  }
);

export const stopMessagesListening = createAsyncThunk(
  'chat/stopMessagesListening',
  async function (_, { dispatch }) {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
  }
);

export const sendMessage = createAsyncThunk<void, string>('sendMessage', async function (message) {
  chatAPI.sendMessage(message);
});

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
  unreadMessages: [] as IChatMessageApi[],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IChatMessageApi[]>) => {
      state.messages = [
        ...state.messages,
        ...action.payload.map((m) => ({ ...m, id: v1() })),
      ].filter((m, index, array) => index >= array.length - 100);
    },

    setUnreadMessages: (state, action: PayloadAction<IChatMessageApi[]>) => {
      const actualState = action.payload;
      const prevState = state.messages;
      if (actualState.length !== 0 && prevState.length !== 0) {
        const lastMessage = actualState[actualState.length - 1];
        const prevLastMessage = prevState[prevState.length - 1];
        if (lastMessage.message !== prevLastMessage.message) {
          state.unreadMessages.push(lastMessage);
        }
      } else if (prevState.length !== 0) {
        state.unreadMessages = [];
      }
    },
    statusChanged: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
});

export const { setMessages, statusChanged, setUnreadMessages } = chatSlice.actions;
export const chatSelector = (state: RootState) => state.chat;
export default chatSlice.reducer;
