import React from "react";
import { Button } from "@material-ui/core";
import classes from "./main.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { authSelector } from "../../../redux/auth-reducer";

const Main = () => {
  const { isAuth } = useAppSelector(authSelector);
  return (
    <div className={classes.mainInfoContainer}>
      <p className={classes.mainInfo}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque autem
        commodi consequuntur culpa delectus deleniti , dolores in laborum natus
        nostrum officious, quibusdam quos ratione reprehenderit repudiandae
        rerum sint, utLorem ipsum dolor sit amet, consectetur adipisicing elit.
        A atque autem commodi consequuntur culpa delectus deleniti , dolores in
        laborum natus nostrum officiis, quibusdam quos ratione reprehenderit
        repudiandae rerum sint, utLorem ipsum dolor sit amet, consectetur
        adipisicing elit. A atque autem commodi consequuntur culpa delectus
        deleniti , dolores in laborum natus nostrum officiis, quibusdam quos
        ratione reprehenderit repudiandae rerum sint, ut.
      </p>
      <div className={classes.buttonsBlock}>
        <Button
          disabled={isAuth}
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
        <Button
          disabled={isAuth}
          component={Link}
          to="/register"
          variant="contained"
          color="inherit"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Main;
