import React from "react";
import classes from "./User.module.css";
import { NavLink } from "react-router-dom";
import { ROUTE } from "../../../../routes/routes";
import userPhoto from "../../../../assets/img/noAvatar.png";
import { Avatar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  followUnfollowUser,
  usersSelector,
} from "../../../../redux/reducers/usersReducer/users-reducer";
import { IUsers } from "../../../../types/IUsers";
import { capitalize } from "../../../../utils/capitalize";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { authSelector } from "../../../../redux/reducers/authReducer/auth-reducer";

interface IUserProps {
  user: IUsers;
}

const User: React.FC<IUserProps> = ({ user }) => {
  const { followingInProgress } = useSelector(usersSelector);
  const { isAuth } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const onUserFollow = (userId: number, followed: boolean) => {
    dispatch(followUnfollowUser({ userId, followed }));
  };

  return (
    <div className={classes.userBlock} key={user.id}>
      <NavLink to={ROUTE.PROFILE + user.id} className={classes.userAvatar}>
        <Avatar
          alt={user.name}
          src={user.photos.small != null ? user.photos.small : userPhoto}
        />
      </NavLink>
      <p className={user.status ? classes.userStatus : classes.noStatus}>
        {user.status ? capitalize(user.status) : "No status"}
      </p>
      <p className={classes.userName}>{capitalize(user.name)}</p>
      <div>
        {user.followed ? (
          <Button
            onClick={() => onUserFollow(user.id, user.followed)}
            className={classes.followBtn}
            disabled={followingInProgress.some((id) => id === user.id)}
            color="primary"
          >
            Unfollow
          </Button>
        ) : (
          <Button
            onClick={() => onUserFollow(user.id, user.followed)}
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
