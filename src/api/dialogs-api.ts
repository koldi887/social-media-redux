import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDialog, IDialogMessage, IDialogWithUser } from '../types/IDialogs';

function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
    : [{ type: tagType, id: 'LIST' }];
}

interface IPost {
  userId: number;
  message: string;
}

export const dialogsApi = createApi({
  reducerPath: 'dialogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    credentials: 'include',
    headers: {
      'API-KEY': '5a063c6f-71b9-4b11-9633-305ea5213c14',
    },
  }),
  tagTypes: ['Dialogs'],

  endpoints: (build) => ({
    getDialogWithUser: build.query<IDialogMessage[], { userId: number; currentPage: number }>({
      query: ({ userId, currentPage }) => `dialogs/${userId}/messages?page=${currentPage}`,
      transformResponse: (response: IDialogWithUser) => response.items,
      providesTags: (result) => providesList(result, 'Dialogs'),
    }),

    getDialogs: build.query<IDialog[], void>({
      query: () => `dialogs`,
    }),

    getNewMessagesCount: build.query({
      query: () => `dialogs/messages/new/count`,
    }),

    getLatestMessage: build.query({
      query: (data: { userId: number; date: string }) =>
        `dialogs/${data.userId}/messages/new?newerThen=${data.date}`,
    }),

    sendNewMessage: build.mutation({
      query: (data: IPost) => ({
        url: `dialogs/${data.userId}/messages`,
        method: 'POST',
        headers: {
          'API-KEY': '5a063c6f-71b9-4b11-9633-305ea5213c14',
        },
        body: { body: data.message },
      }),
      invalidatesTags: [{ type: 'Dialogs', id: 'LIST' }],
    }),

    refreshUser: build.query({
      query: (userId) => `dialogs/${userId}`,
    }),

    restoreMessage: build.query({
      query: (messageId: number) => `dialogs/messages/${messageId}/restore`,
    }),
    deleteMessage: build.query({
      query: (messageId: number) => `dialogs/messages/${messageId}`,
    }),
    spamMessage: build.query({
      query: (messageId: number) => `dialogs/messages/${messageId}/spam`,
    }),
    viewedMessage: build.query({
      query: (messageId: number) => `dialogs/messages/${messageId}/viewed`,
    }),
  }),
});

export const {
  useGetDialogWithUserQuery,
  useGetNewMessagesCountQuery,
  useGetDialogsQuery,
  useSendNewMessageMutation,
  useRefreshUserQuery,
  useGetLatestMessageQuery,
  useRestoreMessageQuery,
  useDeleteMessageQuery,
  useSpamMessageQuery,
  useViewedMessageQuery,
} = dialogsApi;
