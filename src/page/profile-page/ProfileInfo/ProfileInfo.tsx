import React, { useEffect } from "react";
import classes from "./ProfileInfo.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getUserProfile,
  profileSelector,
} from "../../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { capitalize } from "../../../utils/capitalize";
import ProfileInfoData from "./ProfileInfoData/ProfileInfoData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import { useToggle } from "../../../hooks/useToggle";
import { Button } from "@material-ui/core";

interface IProfileInfoProps {
  paramsUserId: string | undefined;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ paramsUserId }) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useToggle(false);
  const [statusToggle, setStatusToggle] = useToggle(false);
  const { profile } = useAppSelector(profileSelector);

  useEffect(() => {
    if (paramsUserId) {
      dispatch(getUserProfile(paramsUserId as unknown as number));
    }
  }, [dispatch, paramsUserId]);

  return (
    <div className={classes.profileInfoContainer}>
      <h2 className={classes.profileName}>{capitalize(profile.fullName)}</h2>

      {!paramsUserId && (
        <Button
          variant="outlined"
          size={"small"}
          color={"primary"}
          onClick={setStatusToggle}
        >
          Set Status
        </Button>
      )}
      {!paramsUserId && statusToggle && (
        <ProfileStatus setStatusToggle={setStatusToggle} />
      )}
      {editMode ? (
        <ProfileDataForm profile={profile} setEditMode={setEditMode} />
      ) : (
        <ProfileInfoData
          profile={profile}
          paramsUserId={paramsUserId}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
