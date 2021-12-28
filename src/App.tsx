import React, { useEffect } from "react";
import classes from "./App.module.css";
import NavBar from "./page/components/header/NavBar";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { initializeApp, initialSlice } from "./redux/app-reducer";
import PreLoader from "./page/components/common/Preloader/Preloader";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Login } from "./page/components/login/Login";
import DialogsContainer from "./page/components/navbar/Dialogs/dialogsContainer";
import UsersContainer from "./page/components/navbar/users/UsersContainer";
import ProtectedRoutes from "./router/ProtectedRoutes";
import Profile from "./page/components/navbar/profile/Profile";
import Main from "./page/components/main/Main";
import Music from "./page/components/navbar/music/music";
import Settings from "./page/components/navbar/settings/settings";
import Register from "./page/components/register/Register";
import HelpPage from "./page/components/help-page/HelpPage";

const App = () => {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(initialSlice);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp());
    }
  }, [dispatch, initialized]);

  if (!initialized) return <PreLoader />;
  return (
    <div className={classes.appContainer}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />}>
            <Route path=":userId" />
          </Route>
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Routes>
    </div>
  );
};

export default App;
