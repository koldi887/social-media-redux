import { Avatar, makeStyles, Theme } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => {
  return {
    user: {
      display: "flex",
      alignItems: "center",
      marginBottom: "4rem",
      "&:last-child": {
        marginBottom: "0",
      },
    },

    name: {
      color: "black",
      margin: "0",
    },

    link: {
      textDecoration: "none",
      margin: "0 0 0 10px",
      "&:hover": {
        opacity: "0.5",
      },
    },
  };
});

const DialogUsers = (props: any) => {
  const classes = useStyles();
  let path = "/Dialogs/" + props.id;

  return (
    <div className={classes.user}>
      <NavLink to={path} className={classes.link}>
        <Avatar style={props.color}>{props.tag}</Avatar>
      </NavLink>
      <NavLink to={path} className={classes.link}>
        <h3 className={classes.name}>{props.name}</h3>
      </NavLink>
    </div>
  );
};
export default DialogUsers;
