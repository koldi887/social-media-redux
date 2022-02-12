import React from "react";
import classes from "./App.module.css";
import { useAppSelector } from "./hooks/redux";
import { initializeSelector } from "./redux/reducers/appReducer/app-reducer";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Login } from "./page/components/Login/Login";
import NavBar from "./page/components/Navbar/NavBar";
import PreLoader from "./page/components/common/Preloader/Preloader";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Main from "./page/components/Main/Main";
import Music from "./page/components/Music/Music";
import Settings from "./page/components/Settings/Settings";
import Register from "./page/components/Register/Register";
import HelpPage from "./page/components/Help/HelpPage";
import { withSuspense } from "./hoc/withSuspense";
import { ROUTE } from "./routes/routing";
import Users from "./page/components/Users/Users";
import { Dialogs } from "./page/components/Dialogs/Dialogs";

const ProfilePage = React.lazy(() => import("./page/profile-page/ProfilePage"));

const App = () => {
  const { initialized, error } = useAppSelector(initializeSelector);

  const SuspenseProfilePage = withSuspense(ProfilePage);

  if (error) return <h1>{error}</h1>;
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
            <Route
              path={ROUTE.USER_PROFILE}
              element={<SuspenseProfilePage />}
            />
            <Route path={ROUTE.USERS} element={<Users />} />
            <Route path={ROUTE.MUSIC} element={<Music />} />
            <Route path={ROUTE.SETTINGS} element={<Settings />} />
            <Route path={ROUTE.HELP} element={<HelpPage />} />
            <Route path={ROUTE.DIALOGS} element={<Dialogs />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
