import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { chatSelector } from '../../../redux/chat-reducer';
import classes from './Chat.module.css';
import noAvatarImg from '../../../assets/img/pinpng.com-no-avatar-png-3416159.png';

export const Message: React.FC = () => {
  const { messages, status } = useAppSelector(chatSelector);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const messageAnchorRef = useRef<HTMLDivElement>(null);

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
    <div className={classes.messagesContainer} onScroll={scrollHandler}>
      {messages.map((m) => (
        <>
          <div key={m.id} className={classes.messageWrapper}>
            <div className={classes.userWrapper}>
              <img className={classes.messageAvatar} src={m.photo ? m.photo : noAvatarImg} alt="" />
              <p className={classes.messageUser}>{m.userName}</p>
            </div>
            <p className={classes.messageText}>{m.message}</p>
          </div>
          <hr />
        </>
      ))}
      {status === 'error' && (
        <div style={{ color: 'red' }}>Some error occurred. Please refresh page. </div>
      )}
      <div ref={messageAnchorRef} />
    </div>
  );
};
