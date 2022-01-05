import React from "react";
import classes from "./ProfileDataForm.module.css";
import { IProfileData } from "../../../../../models/IProfileData";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { useAppDispatch } from "../../../../../hooks/redux";
import { saveProfileInfo } from "../../../../../redux/profile-reducer";
import { useToggle } from "../../../../../hooks/useToggle";
import { ErrorMessage } from "@hookform/error-message";

interface IProfileFormProps {
  profile: IProfileData;
  setEditMode: () => void;
}

const ProfileDataForm: React.FC<IProfileFormProps> = ({
  profile,
  setEditMode,
}) => {
  const lookingForAJob = profile.lookingForAJob;
  const dispatch = useAppDispatch();
  const [toggleValue, setToggleValue] = useToggle(lookingForAJob);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onProfileInfoSubmit = (profileData: object) => {
    dispatch(saveProfileInfo(profileData));
    setEditMode();
  };

  return (
    <form
      className={classes.editForm}
      onSubmit={handleSubmit((data) => onProfileInfoSubmit(data))}
    >
      <label className={classes.editProfileLabel}>Edit Profile:</label>
      <TextField
        label="Full name"
        variant="outlined"
        size={"small"}
        defaultValue={profile.fullName}
        {...register("FullName", {
          required: "This field is required",
        })}
      />
      <ErrorMessage errors={errors} name="FullName" />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={profile.lookingForAJob}
            onClick={setToggleValue}
            {...register("lookingForAJob")}
          />
        }
        label="Looking for a Job"
      />

      {toggleValue && (
        <>
          <TextField
            id="standard-multiline-static"
            label="My skills"
            variant="outlined"
            rows={4}
            defaultValue={profile.lookingForAJobDescription}
            multiline
            fullWidth
            {...register("LookingForAJobDescription", {
              required: "This field is required",
            })}
          />
          <ErrorMessage errors={errors} name="LookingForAJobDescription" />
        </>
      )}

      <TextField
        id="standard-multiline-static"
        label="About me"
        variant="outlined"
        size={"small"}
        defaultValue={profile.aboutMe}
        rows={4}
        multiline
        fullWidth
        {...register("AboutMe")}
      />
      <section className={classes.contactsList}>
        <label className={classes.contactsLabel}>Contacts:</label>
        {Object.entries(profile.contacts).map(([item, value]) => (
          <TextField
            type="url"
            key={item}
            label={item}
            variant="outlined"
            size="small"
            defaultValue={value}
            {...register(`contacts.${item}`, {})}
          />
        ))}
      </section>
      <section className={classes.formButtons}>
        <Button type="submit" size="small" variant="contained" color="primary">
          Edit Info
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={setEditMode}
        >
          Cancel
        </Button>
      </section>
    </form>
  );
};

export default ProfileDataForm;
