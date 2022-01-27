import React from 'react';
import classes from './LoggedNavbar.module.css';
import DropdownMenu from './dropdown-menu/DropdownMenu';
import { Chat } from '../Chat/Chat';

const LoggedNavbar = () => {
  return (
    <div className={classes.navBlock}>
      <div className={classes.navLinksBlock}>
        <Chat />
        <div className={classes.navMusic}>
          <i className={`fas fa-music fa-lg`} />
        </div>
      </div>
      <DropdownMenu />
    </div>
  );
};

export default LoggedNavbar;
