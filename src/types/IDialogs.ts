import { IPhotoType } from './IProfileData';

export interface IDialog {
  hasNewMessages: boolean;
  id: number;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: IPhotoType;
  userName: string;
}

export interface IDialogMessage {
  addedAt: string;
  body: string;
  id: string;
  recipientId: number;
  senderId: number;
  senderName: string;
  translatedBody: null | string;
  viewed: boolean;
}

export interface IDialogWithUser {
  items: IDialogMessage[];
  totalCount: number;
  error: null | string;
}
