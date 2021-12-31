import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserStatus } from "../../../../redux/profile-reducer";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import ProfileInfo from "./ProfileInfo";

interface IProps {
  paramsUserId: string | undefined;
}

const ProfileInfoContainer: React.FC<IProps> = ({ paramsUserId }) => {
  const dispatch = useAppDispatch();
  const authorizedUserId = useAppSelector<number | null>(
    (state) => state.auth.id
  );
  const [newStatus, setNewStatus] = useState("");

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatus(e.target.value);
  };

  const setNewStatusHandler = (
    setToggleValue: React.Dispatch<React.SetStateAction<void>>
  ) => {
    dispatch(updateUserStatus(newStatus));
    setToggleValue();
  };

  useEffect(() => {
    if (paramsUserId) {
      dispatch(getUserProfile(paramsUserId as unknown as number));
    }
  }, [dispatch, authorizedUserId, paramsUserId]);

  return (
    <ProfileInfo
      onStatusChange={onStatusChange}
      setNewStatusHandler={setNewStatusHandler}
    />
  );
};

export default ProfileInfoContainer;
