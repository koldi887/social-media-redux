import React from "react";
import classes from "./users.module.css";
import { NavLink } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import userPhoto from "../../../img/noAvatar.png";
import { useSelector } from "react-redux";
import { usersSelector } from "../../../../redux/users-reducer";
import { IUser } from "../../../../models/IUser";

interface IProps {
  user: IUser;
  isAuth: Boolean;
  followHandler: (value: IUser) => void;
}

const User: React.FC<IProps> = ({ user, isAuth, followHandler }) => {
  const { followingInProgress } = useSelector(usersSelector);
  return (
    <div className={classes.usersBlock} key={user.id}>
      <NavLink to={"/profile/" + user.id} className={classes.usersAvatar}>
        <Avatar
          alt={user.name}
          src={user.photos.small != null ? user.photos.small : userPhoto}
        />
      </NavLink>
      <p className={user.status ? classes.userStatus : classes.noStatus}>
        {user.status ? user.status : "No status"}
      </p>
      <p className={classes.userName}>{user.name}</p>
      <div>
        {user.followed ? (
          <Button
            onClick={() => followHandler(user)}
            className={classes.followBtn}
            disabled={followingInProgress.some((id) => id === user.id)}
            color="primary"
          >
            Unfollow
          </Button>
        ) : (
          <Button
            onClick={() => followHandler(user)}
            className={classes.followBtn}
            disabled={
              isAuth ? followingInProgress.some((id) => id === user.id) : true
            }
            color="primary"
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default User;
