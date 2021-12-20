import React from "react";
import classes from "./dropdown.module.css";

const Dropdown = () => {
  return (
    <ul className={classes.dropDownContainer}>
      <li>Settings</li>
      <li>Help</li>
      <li>Sign Out</li>
    </ul>
  );
};

export default Dropdown;
