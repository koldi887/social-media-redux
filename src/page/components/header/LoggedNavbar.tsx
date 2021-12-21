import React, { useRef } from "react";
import classes from "./loggedNavbar.module.css";
import noAvatarImg from "./pinpng.com-no-avatar-png-3416159.png";
import { useToggle } from "../../../hooks/useToggle";
import Dropdown from "./dropdown/Dropdown";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const LoggedNavbar = () => {
  const [toggleValue, setToggleValue] = useToggle(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(dropdownRef, setToggleValue);

  return (
    <div className={classes.navBlock}>
      <ul className={classes.navLinksBlock}>
        <li className={classes.navNotification}>
          <i className={`far fa-bell fa-lg`} />
        </li>
        <li className={classes.navMusic}>
          <i className={`fas fa-music fa-lg`} />
        </li>
      </ul>
      <div>
        <p>TEST-isa</p>
        <h1>Dima</h1>
        <ul className={classes.navProfileBlock} ref={dropdownRef}>
          <li className={classes.navProfile} onClick={setToggleValue}>
            <img src={noAvatarImg} alt="" className={classes.navProfileImg} />
            <i className="fas fa-angle-down" />
          </li>
          {toggleValue && <Dropdown />}
        </ul>
      </div>
    </div>
  );
};

export default LoggedNavbar;
