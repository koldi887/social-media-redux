import React, { useEffect, useRef, useState } from 'react';
import classes from './Chat.module.css';
import { Button } from '@material-ui/core';
import noAvatarImg from '../../../assets/img/pinpng.com-no-avatar-png-3416159.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  chatSelector,
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from '../../../redux/chat-reducer';

export const Chat = () => {
  const { status } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div className={classes.chatContainer}>
      {status === 'error' && (
        <div style={{ color: 'red' }}>Some error occurred. Please refresh page. </div>
      )}
      <Message />
      <AddMessageForm />
    </div>
  );
};

export const Message: React.FC = () => {
  const { messages } = useAppSelector(chatSelector);
  const messageAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={classes.messages} onScroll={scrollHandler}>
      {messages.map((m) => (
        <div key={m.id}>
          <img className={classes.img} src={m.photo ? m.photo : noAvatarImg} alt="" />
          <p>{m.message}</p>
        </div>
      ))}
      <div ref={messageAnchorRef} />
    </div>
  );
};

export const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const { status } = useAppSelector(chatSelector);

  const dispatch = useAppDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }

    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <div>
      <textarea onChange={(e) => setMessage(e.target.value)} value={message} />
      <Button color={'primary'} disabled={status !== 'ready'} onClick={sendMessageHandler}>
        send
      </Button>
    </div>
  );
};
