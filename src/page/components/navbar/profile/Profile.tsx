import React from "react";
import classes from "./profile.module.css";
import Grid from "@material-ui/core/Grid";
import userAvatar from "../../../img/pngegg.png";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import { authSelector } from "../../../../redux/auth-reducer";
import MyPostsContainer from "./MyPost/MyPostContainer";

const Profile = () => {
  const { userId } = useParams<string>();
  const { isAuth } = useSelector(authSelector);

  // if (!isAuth) return <Navigate to={"/login"} />;
  return (
    <Grid container spacing={0}>
      <Grid item md={6}>
        <ProfileInfoContainer paramsUserId={userId} />
      </Grid>
      <Grid md={6} item>
        <img className={classes.profileImg} src={userAvatar} alt="" />
      </Grid>
      <MyPostsContainer />
    </Grid>
  );
};

export default Profile;
