import classes from "./navbar.module.css";
import logo from "../header/lukso_token_logo.png";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getUserProfile } from "../../../redux/profile-reducer";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector((state) => state.auth.id);
  const profileId = useAppSelector((state) => state.profilePage.profile.userId);

  const getAutData = () => {
    if (authUserId !== profileId) {
      dispatch(getUserProfile(authUserId));
    }
  };
  return (
    <div className={classes.navContainer}>
      <ul className={classes.navLinks}>
        <img className={classes.navLogo} src={logo} alt="" />
        <NavLink className={classes.link} to="/profile" onClick={getAutData}>
          <li>Profiil</li>
        </NavLink>
        <NavLink className={classes.link} to="/dialogs">
          <li>Sönumid</li>
        </NavLink>
        <NavLink className={classes.link} to="/users">
          <li>Kasutajad</li>
        </NavLink>
        <NavLink className={classes.link} to="/music">
          <li>Muusika</li>
        </NavLink>
        <NavLink className={classes.link} to="/settings">
          <li>Sätted</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
