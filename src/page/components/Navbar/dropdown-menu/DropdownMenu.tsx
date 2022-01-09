import React from "react";
import classes from "./Dropdown.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import { logOut } from "../../../../redux/auth-reducer";
import { dropdownElements } from "./dropdownElements";

const DropdownMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <ul className={classes.profileDropBlock}>
      {dropdownElements.map((elem) => (
        <li onClick={() => navigate(elem.path)} key={elem.name}>
          {elem.logo}
          {elem.name}
        </li>
      ))}
      <li onClick={logOutUser}>
        <i className="fas fa-sign-out-alt" />
        Sign Out
      </li>
    </ul>
  );
};

export default DropdownMenu;
