import * as React from 'react';
import classes from './Navbar.module.css';
import navLogo from '../../../assets/img/lukso_token_logo.png';
import LoggedNavbar from './LoggedNavbar';
import { useAppSelector } from '../../../hooks/redux';
import { authSelector } from '../../../redux/auth-reducer';
import { Link } from 'react-router-dom';
import SearchBox from './Search/SearchBox';
import { ROUTE } from '../../../routes/routing';

const NavBar = () => {
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

export default NavBar;
