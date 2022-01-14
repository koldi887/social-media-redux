import React, { useRef } from "react";
import classes from "./LoggedNavbar.module.css";
import noAvatarImg from "../../../assets/img/pinpng.com-no-avatar-png-3416159.png";
import { useToggle } from "../../../hooks/useToggle";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import { useAppSelector } from "../../../hooks/redux";
import { profileSelector } from "../../../redux/profile-reducer";

const LoggedNavbar = () => {
  const [toggleValue, setToggleValue] = useToggle(false);
  const { profile } = useAppSelector(profileSelector);
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(dropdownRef, setToggleValue, toggleValue);

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
        {
          <ul className={classes.navProfileBlock} ref={dropdownRef}>
            <li
              className={`${classes.navProfile} ${
                toggleValue && classes.active
              }`}
              onClick={setToggleValue}
            >
              <img
                src={profile.photos?.small ? profile.photos.small : noAvatarImg}
                alt=""
                className={classes.navProfileImg}
              />
              <i className="fas fa-angle-down" />
            </li>
            {toggleValue && <DropdownMenu />}
          </ul>
        }
      </div>
    </div>
  );
};

export default LoggedNavbar;
