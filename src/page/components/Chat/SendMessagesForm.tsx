import React, { useState } from 'react';
import classes from './Chat.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { chatSelector, sendMessage } from '../../../redux/chat-reducer';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

type DataType = { message: string };

export const AddMessageForm: React.FC = () => {
  const { status } = useAppSelector(chatSelector);
  const { register, handleSubmit, reset } = useForm<DataType>();

  const dispatch = useAppDispatch();

  const onMessageSend = handleSubmit((data) => {
    if (!data) {
      return;
    }
    dispatch(sendMessage(data.message));
    reset();
  });

  return (
    <form className={classes.messageFormBlock} onSubmit={onMessageSend}>
      <TextField
        id="standard-multiline-static"
        variant="outlined"
        className={classes.textField}
        rows={2}
        multiline
        fullWidth
        {...register('message', {
          required: '',
        })}
      />
      <Button
        type="submit"
        size="small"
        variant="contained"
        color="primary"
        disabled={status !== 'ready'}
      >
        Send
      </Button>
    </form>
  );
};
