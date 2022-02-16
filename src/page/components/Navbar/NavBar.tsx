import * as React from "react";
import classes from "./Navbar.module.css";
import navLogo from "../../../assets/img/lukso_token_logo.png";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../routes/routes";
import { useAppSelector } from "../../../hooks/redux";
import { authSelector } from "../../../redux/reducers/authReducer/auth-reducer";
import { SearchBox } from "./Search/SearchBox";
import { LoggedNavbar } from "./LoggedNavbar";

export const NavBar = () => {
  const { isAuth } = useAppSelector(authSelector);

  return (
    <nav className={classes.navContainer}>
      <div className={classes.navBlock}>
        <div className={classes.navElementsBlock}>
          <Link to={ROUTE.MAIN}>
            <img src={navLogo} alt="Main" className={classes.navLogo} />
          </Link>
          <SearchBox />
        </div>
        {isAuth && <LoggedNavbar />}
      </div>
    </nav>
  );
};
