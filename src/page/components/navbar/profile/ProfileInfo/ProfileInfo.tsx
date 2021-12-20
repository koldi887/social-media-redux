import React from "react";
import classes from "./ProfileInfo.module.css";
import { useToggle } from "../../../../../hooks/useToggle";
import { useAppSelector } from "../../../../../hooks/redux";
import { profileSelector } from "../../../../../redux/profile-reducer";

interface IProps {
  onStatusChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setNewStatusHandler: (
    value: React.Dispatch<React.SetStateAction<void>>
  ) => void;
}

const ProfileInfo: React.FC<IProps> = ({
  onStatusChange,
  setNewStatusHandler,
}) => {
  const { profile, status } = useAppSelector(profileSelector);
  const [toggle, setToggle] = useToggle(false);

  return (
    <div>
      <ul className={classes.infoListBlock}>
        <h2>{profile.fullName}</h2>
        {toggle ? (
          <li>
            <input type="text" onChange={onStatusChange} />
            <button onClick={() => setNewStatusHandler(setToggle)}>
              Set status
            </button>
          </li>
        ) : (
          <li onDoubleClick={setToggle}>Status: {status}</li>
        )}
        <li>Date of birth:</li>
        <li>City:</li>
        <li>Education:</li>
        <li>Contacts:</li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
