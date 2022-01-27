import React from 'react';
import classes from './DialogsChat.module.css';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useGetDialogWithUserQuery, useSendNewMessageMutation } from '../../../api/dialogs-api';
import { skipToken } from '@reduxjs/toolkit/query';
import PreLoader from '../common/Preloader/Preloader';

interface IDialogsChatProps {
  selectedDialog: number | null;
}

export const DialogsChat: React.FC<IDialogsChatProps> = ({ selectedDialog }) => {
  const { register, handleSubmit, reset } = useForm();
  const [sendMessage] = useSendNewMessageMutation();
  const { data, isLoading } = useGetDialogWithUserQuery(
    selectedDialog
      ? {
          userId: selectedDialog,
          currentPage: 1,
        }
      : skipToken
  );

  const onMessageSend = handleSubmit(async (data: { body: string }) => {
    if (data.body && selectedDialog) {
      await sendMessage({ userId: selectedDialog, message: data.body });
    }
    reset();
  });

  return (
    <div className={classes.dialogChatContainer}>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <div className={classes.dialogsMessagesBlock}>
            {data?.map((messages) => (
              <div key={messages.id}>
                {messages.senderName}: {messages.body}
              </div>
            ))}
          </div>
          <form onSubmit={onMessageSend}>
            <TextField
              type="submit"
              id="standard-multiline-static"
              variant="outlined"
              rows={2}
              multiline
              required={true}
              {...register('body')}
            />
            <Button type="submit" size="small" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
