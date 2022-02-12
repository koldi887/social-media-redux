import React from 'react';
import classes from './DialogsChat.module.css';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useGetDialogWithUserQuery, useSendNewMessageMutation } from '../../../api/dialogs-api';
import { PreLoader } from "../common/Preloader/Preloader";
import { IDialog } from '../../../types/IDialogs';
import { capitalize } from '../../../utils/capitalize';

interface IDialogsChatProps {
  selectedDialog: IDialog;
}

export const DialogsChat: React.FC<IDialogsChatProps> = ({ selectedDialog }) => {
  const { register, handleSubmit, reset } = useForm();
  const [sendMessage] = useSendNewMessageMutation();
  const { data, isLoading } = useGetDialogWithUserQuery({
    userId: selectedDialog.id,
    currentPage: 1,
  });

  const onMessageSend = handleSubmit(async (data: { body: string }) => {
    if (data.body) {
      await sendMessage({ userId: selectedDialog.id, message: data.body });
      reset();
    }
  });

  return (
    <div className={classes.dialogChatContainer}>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <div className={classes.messagesBlock}>
            {data?.map((messages) => (
              <div key={messages.id} className={classes.messageWrapper}>
                <p>
                  <b>{capitalize(messages.senderName)}</b>: {messages.body}
                </p>
                <div className={classes.iconsWrapper}>
                  <i className={`far fa-trash-alt ${classes.delete}`} />
                  <span className={classes.spam}>Spam</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onMessageSend} className={classes.sendMessageForm}>
            <TextField
              type="submit"
              id="standard-multiline-static"
              variant="outlined"
              rows={2}
              multiline
              fullWidth
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
