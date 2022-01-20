import React, { useEffect } from 'react';
import classes from './App.module.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { initializeApp, initialSlice } from './redux/app-reducer';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { Login } from './page/components/Login/Login';
import NavBar from './page/components/Navbar/NavBar';
import PreLoader from './page/components/common/Preloader/Preloader';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Main from './page/components/Main/Main';
import Music from './page/components/Music/Music';
import Settings from './page/components/Settings/Settings';
import Register from './page/components/Register/Register';
import HelpPage from './page/components/Help/HelpPage';
import { withSuspense } from './hoc/withSuspense';
import { ROUTE } from './routes/routing';
import Users from './page/components/Users/Users';

const ProfilePage = React.lazy(() => import('./page/profile-page/ProfilePage'));

const App = () => {
  const { initialized } = useAppSelector(initialSlice);

  const dispatch = useAppDispatch();
  const SuspenseProfilePage = withSuspense(ProfilePage);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp());
    }
  }, []);

  if (!initialized) return <PreLoader />;
  return (
    <div className={classes.appContainer}>
      <NavBar />
      <div className={classes.pagesBlock}>
        <Routes>
          <Route path={ROUTE.MAIN} element={<Main />} />
          <Route path={ROUTE.LOGIN} element={<Login />} />
          <Route path={ROUTE.REGISTER} element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={ROUTE.PROFILE} element={<SuspenseProfilePage />} />
            <Route path={ROUTE.USER_PROFILE} element={<SuspenseProfilePage />} />
            <Route path={ROUTE.USERS} element={<Users />} />
            <Route path={ROUTE.MUSIC} element={<Music />} />
            <Route path={ROUTE.SETTINGS} element={<Settings />} />
            <Route path={ROUTE.HELP} element={<HelpPage />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
      {/*<Chat />*/}
    </div>
  );
};

export default App;
