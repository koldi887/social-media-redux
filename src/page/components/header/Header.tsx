import * as React from "react";
import classes from "./header.module.css";
import navLogo from "./lukso_token_logo.png";
import LoggedNavbar from "./LoggedNavbar";
import { useAppSelector } from "../../../hooks/redux";
import { authSelector } from "../../../redux/auth-reducer";

const Header = () => {
  const { isAuth } = useAppSelector(authSelector);
  return (
    <nav className={classes.navContainer}>
      <div className={classes.navBlock}>
        <div className={classes.navElementsBlock}>
          <img src={navLogo} alt="Main" className={classes.navLogo} />
          <div className={classes.inputBlock}>
            <i className={`fas fa-search ${classes.searchIcon}`} />
            <input
              type="search"
              placeholder={"Search"}
              className={classes.searchInput}
            />
          </div>
        </div>
        {isAuth && <LoggedNavbar />}
      </div>
    </nav>
  );
};

export default Header;
