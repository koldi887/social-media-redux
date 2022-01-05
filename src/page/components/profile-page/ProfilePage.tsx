import React from "react";
import classes from "./profilePage.module.css";
import { useParams } from "react-router-dom";
import ProfileImage from "./ProfileImage/ProfileImage";
import UsersContainer from "../users/UsersContainer";
import MyPostsContainer from "./MyPost/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const ProfilePage = () => {
  const { userId } = useParams<string>();

  return (
    <div className={classes.profilePageWrapper}>
      <div className={classes.profileImageWrapper}>
        <ProfileImage paramsUserId={userId} />
      </div>
      <div className={classes.infoWrapper}>
        <ProfileInfo paramsUserId={userId} />
        {!userId && (
          <div className={classes.postsWrapper}>
            <MyPostsContainer />
          </div>
        )}
      </div>
      <div className={classes.usersWrapper}>
        <UsersContainer />
      </div>
    </div>
  );
};

export default ProfilePage;
