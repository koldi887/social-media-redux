import React, { useState } from "react";
import classes from "./ProfileStatus.module.css";
import { useAppDispatch } from "../../../../../hooks/redux";
import { Button, TextField } from "@material-ui/core";
import { useToggle } from "../../../../../hooks/useToggle";
import { updateProfileStatus } from "../../../../../redux/profile-reducer";

interface IStatusProps {
  userId: number | null;
}

const ProfileStatus: React.FC<IStatusProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const [newStatus, setNewStatus] = useState("");
  const [toggleValue, setToggleValue] = useToggle(false);

  const onStatusChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewStatus(e.target.value);
  };

  const onStatusSave = () => {
    dispatch(updateProfileStatus(newStatus));
    setToggleValue();
  };

  return (
    <div>
      <Button
        variant="outlined"
        size={"small"}
        color={"primary"}
        onClick={setToggleValue}
      >
        Set Status
      </Button>
      {toggleValue && (
        <div className={classes.statusContainerActive}>
          <i
            className={`fas fa-times fa-lg ${classes.closeIcon}`}
            onClick={setToggleValue}
          />
          <TextField
            fullWidth
            label="New status"
            variant="outlined"
            color="primary"
            size="small"
            onChange={(e) => onStatusChange(e)}
          />
          <Button
            variant="contained"
            color={"primary"}
            size={"small"}
            onClick={onStatusSave}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
