import React, { Suspense, useEffect } from "react";
import classes from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { initializeApp, initialSlice } from "./redux/app-reducer";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Login } from "./page/components/login/Login";
import NavBar from "./page/components/header/NavBar";
import PreLoader from "./page/components/common/Preloader/Preloader";
import DialogsContainer from "./page/components/dialogs/dialogsContainer";
import UsersContainer from "./page/components/users/UsersContainer";
import ProtectedRoutes from "./router/ProtectedRoutes";
import Main from "./page/components/main/Main";
import Music from "./page/components/music/music";
import Settings from "./page/components/settings/settings";
import Register from "./page/components/register/Register";
import HelpPage from "./page/components/help-page/HelpPage";

const ProfilePage = React.lazy(
  () => import("./page/components/profile-page/ProfilePage")
);

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
      <div className={classes.pagesBlock}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<h1>Page Loading... </h1>}>
                  <ProfilePage />
                </Suspense>
              }
            >
              <Route
                path=":userId"
                element={
                  <Suspense fallback={<h1>Page Loading... </h1>}>
                    <ProfilePage />
                  </Suspense>
                }
              />
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
    </div>
  );
};

export default App;
