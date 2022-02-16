import React, { useRef } from "react";
import classes from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  authSelector,
  logOut,
} from "../../../../redux/reducers/authReducer/auth-reducer";
import { dropdownElements } from "./dropdownElements";
import noAvatarImg from "../../../../assets/img/pinpng.com-no-avatar-png-3416159.png";
import { useToggle } from "../../../../hooks/useToggle";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

const DropdownMenu = () => {
  const { avatar } = useAppSelector(authSelector);
  const [toggleValue, setToggleValue] = useToggle(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, setToggleValue, toggleValue);

  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <div className={classes.navProfileContainer} ref={dropdownRef}>
      <div
        className={`${classes.navProfileBlock} ${
          toggleValue && classes.active
        }`}
        onClick={setToggleValue}
      >
        <img
          src={avatar ? avatar : noAvatarImg}
          alt=""
          className={classes.navProfileImg}
        />
        <i className="fas fa-angle-down" />
      </div>

      {toggleValue && (
        <div className={classes.dropDownBlock}>
          {dropdownElements.map((elem) => (
            <Link
              to={elem.path}
              key={elem.name}
              className={classes.dropDownLinks}
            >
              {elem.logo}
              {elem.name}
            </Link>
          ))}
          <div onClick={logOutUser} className={classes.dropDownLinks}>
            <i className="fas fa-sign-out-alt" />
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
