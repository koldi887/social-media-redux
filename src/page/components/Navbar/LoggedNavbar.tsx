import React from 'react';
import classes from './LoggedNavbar.module.css';
import DropdownMenu from './dropdown-menu/DropdownMenu';
import { Chat } from '../Chat/Chat';

const LoggedNavbar = () => {
  return (
    <div className={classes.navBlock}>
      <ul className={classes.navLinksBlock}>
        <li>
          <Chat />
        </li>
        <li className={classes.navMusic}>
          <i className={`fas fa-music fa-lg`} />
        </li>
      </ul>
      <DropdownMenu />
    </div>
  );
};

export default LoggedNavbar;
