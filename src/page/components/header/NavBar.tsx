import * as React from "react";
import classes from "./navbar.module.css";
import navLogo from "../../img/lukso_token_logo.png";
import LoggedNavbar from "./LoggedNavbar";
import { useAppSelector } from "../../../hooks/redux";
import { authSelector } from "../../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuth } = useAppSelector(authSelector);
  const navigate = useNavigate();

  return (
    <nav className={classes.navContainer}>
      <div className={classes.navBlock}>
        <div className={classes.navElementsBlock}>
          <img
            src={navLogo}
            alt="Main"
            className={classes.navLogo}
            onClick={() => navigate("/")}
          />
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

export default NavBar;
