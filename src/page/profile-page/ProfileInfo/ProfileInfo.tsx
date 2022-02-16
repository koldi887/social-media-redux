import React from "react";
import classes from "./ProfileInfo.module.css";
import { useAppSelector } from "../../../hooks/redux";
import { profileSelector } from "../../../redux/reducers/profileReducer/profile-reducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { capitalize } from "../../../utils/capitalize";
import { ProfileData } from "./ProfileData/ProfileData";
import ProfileChangeForm from "./ProfileChangeForm/ProfileChangeForm";
import { useToggle } from "../../../hooks/useToggle";
import { Button } from "@material-ui/core";

interface IProfileInfoProps {
  paramsUserId: string | undefined;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ paramsUserId }) => {
  const [editMode, setEditMode] = useToggle(false);
  const [statusToggle, setStatusToggle] = useToggle(false);
  const { profile } = useAppSelector(profileSelector);

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
        <ProfileChangeForm profile={profile} setEditMode={setEditMode} />
      ) : (
        <ProfileData
          profile={profile}
          paramsUserId={paramsUserId}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
