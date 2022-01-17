import React, { Suspense, useEffect } from "react";
import classes from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { initializeApp, initialSlice } from "./redux/app-reducer";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Login } from "./page/components/Login/Login";
import NavBar from "./page/components/Navbar/NavBar";
import PreLoader from "./page/components/common/Preloader/Preloader";
import DialogsContainer from "./page/components/Dialogs/dialogsContainer";
import UsersContainer from "./page/components/Users/UsersContainer";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Main from "./page/components/Main/Main";
import Music from "./page/components/Music/Music";
import Settings from "./page/components/Settings/Settings";
import Register from "./page/components/Register/Register";
import HelpPage from "./page/components/Help/HelpPage";
import { withSuspense } from "./hoc/withSuspense";
import { Chat } from "./page/components/Chat/Chat";

const ProfilePage = React.lazy(() => import("./page/profile-page/ProfilePage"));

const App = () => {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(initialSlice);

  const SuspendedProfilePage = withSuspense(ProfilePage);

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
            <Route path="/profile" element={<SuspendedProfilePage />}>
              <Route path=":userId" element={<SuspendedProfilePage />} />
            </Route>
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
      <Chat />
    </div>
  );
};

export default App;
