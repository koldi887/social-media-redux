import React, { useEffect } from "react";
import classes from "./ProfileImage.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import userPhoto from "../../../assets/img/pinpng.com-no-avatar-png-3416159.png";
import {
  profileSelector,
  updateProfilePhoto,
} from "../../../redux/reducers/profileReducer/profile-reducer";
import { Button, styled } from "@material-ui/core";

import { getAuthUserData } from "../../../redux/reducers/authReducer/auth-reducer";

interface IProfileImageProps {
  paramsUserId: string | undefined;
}

const Input = styled("input")({
  display: "none",
});

const ProfileImage: React.FC<IProfileImageProps> = ({ paramsUserId }) => {
  const { profile, status } = useAppSelector(profileSelector);

  const dispatch = useAppDispatch();

  const onProfilePhotoSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let photoFile = event.target.files;
    if (photoFile?.length) {
      dispatch(updateProfilePhoto(photoFile[0]));
    }
  };

  return (
    <div className={classes.profileImageBlock}>
      <img
        src={profile.photos?.large || userPhoto}
        className={classes.profileImg}
        alt={"profile"}
      />
      {!paramsUserId && (
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(event) => onProfilePhotoSelected(event)}
          />
          <Button
            variant="contained"
            component="span"
            size={"small"}
            color={"primary"}
          >
            Change photo
          </Button>
        </label>
      )}
      <div className={classes.statusBlock}>
        <h3 className={classes.statusTitle}>Status:</h3>
        <p className={classes.profileStatus}>{status ? status : "No status"}</p>
      </div>
    </div>
  );
};

export default ProfileImage;
