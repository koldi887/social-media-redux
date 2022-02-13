import React from "react";
import classes from "./App.module.css";
import {useAppSelector} from "./hooks/redux";
import {routesList} from "./routes/routes";
import {initializeSelector} from "./redux/reducers/appReducer/app-reducer";
import {useRoutes} from "react-router-dom";
import {NavBar} from "./page/components/Navbar/NavBar";
import {PreLoader} from "./page/components/common/Preloader/Preloader";

const App = () => {
  const {initialized, error} = useAppSelector(initializeSelector);

  const routes = useRoutes(routesList);

  if (error) return <h1>{error}</h1>;
  if (!initialized) return <PreLoader/>;
  return (
      <div className={classes.appContainer}>
        <NavBar/>
        <div className={classes.pagesBlock}>{routes}</div>
      </div>
  );
};

export default App;
