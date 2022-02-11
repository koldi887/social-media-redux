import React, { useEffect } from 'react';
import classes from './Chat.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  chatSelector,
  setUnreadMessages,
  startMessagesListening,
  stopMessagesListening,
} from '../../../redux/reducers/chatReducer/chat-reducer';
import { AddMessageForm } from './SendMessagesForm';
import { Message } from './Message';
import { useToggle } from '../../../hooks/useToggle';

export const Chat: React.FC = () => {
  const { unreadMessages } = useAppSelector(chatSelector);
  const [chatToggle, setChatToggle] = useToggle(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  const onChatActive = () => {
    setChatToggle();
    dispatch(setUnreadMessages([]));
  };

  return (
    <>
      <div onClick={onChatActive} className={classes.navMessagesBlock}>
        <i className={`far fa-comment-alt fa-lg`} />
        {!chatToggle && unreadMessages.length !== 0 && (
          <span className={classes.newMessageNotification}>{unreadMessages.length}</span>
        )}
      </div>

      {chatToggle && (
        <div className={classes.chatContainer}>
          <h2>General chat</h2>
          <Message />
          <AddMessageForm />
        </div>
      )}
    </>
  );
};
