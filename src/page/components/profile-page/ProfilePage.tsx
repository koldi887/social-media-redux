import React from "react";
import classes from "./profilePage.module.css";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import { useParams } from "react-router-dom";
import ProfileImage from "./profile-image-component/ProfileImage";
import UsersContainer from "../users/UsersContainer";
import MyPostsContainer from "./MyPost/MyPostContainer";

const ProfilePage = () => {
  const { userId } = useParams<string>();
  return (
    <div className={classes.profilePageContainer}>
      <div className={classes.profileImageContainer}>
        <ProfileImage paramsUserId={userId} />
      </div>
      <div className={classes.infoContainer}>
        <ProfileInfoContainer paramsUserId={userId} />
      </div>

      <div className={classes.usersContainer}>
        <UsersContainer />
      </div>

      {!userId &&
        <>
          <div className={classes.postsContainer}>
            <MyPostsContainer />
          </div>
          <div className={classes.friendsContainer}>
            dima
          </div>
        </>
      }
    </div>
  );
};

export default ProfilePage;
