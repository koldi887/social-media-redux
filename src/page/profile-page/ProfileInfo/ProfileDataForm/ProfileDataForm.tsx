import React from 'react'
import classes from './ProfileDataForm.module.css'
import { IProfileContacts, IProfileData } from '../../../../types/IProfileData'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { useAppDispatch } from '../../../../hooks/redux'
import { saveProfileInfo } from '../../../../redux/profile-reducer'
import { useToggle } from '../../../../hooks/useToggle'
import { ErrorMessage } from '@hookform/error-message'

interface IProfileFormProps {
  profile: IProfileData
  setEditMode: () => void
}

const ProfileDataForm: React.FC<IProfileFormProps> = ({ profile, setEditMode }) => {
  const lookingForAJob = profile.lookingForAJob
  const [toggleValue, setToggleValue] = useToggle(lookingForAJob)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileData>()

  const onProfileInfoSubmit = handleSubmit((profileData) => {
    dispatch(saveProfileInfo(profileData))
    setEditMode()
  })

  return (
    <form className={classes.editForm} onSubmit={onProfileInfoSubmit}>
      <label className={classes.editProfileLabel}>Edit Profile:</label>
      <TextField
        label="Full name"
        variant="outlined"
        size={'small'}
        defaultValue={profile.fullName}
        {...register('fullName', {
          required: 'This field is required',
        })}
      />
      <ErrorMessage errors={errors} name="FullName" />
      <FormControlLabel
        label="Looking for a Job"
        control={
          <Checkbox
            defaultChecked={profile.lookingForAJob}
            onClick={setToggleValue}
            {...register('lookingForAJob')}
          />
        }
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
            {...register('lookingForAJobDescription', {
              required: 'This field is required',
            })}
          />
          <ErrorMessage errors={errors} name="LookingForAJobDescription" />
        </>
      )}

      <TextField
        id="standard-multiline-static"
        label="About me"
        variant="outlined"
        size={'small'}
        defaultValue={profile.aboutMe}
        rows={4}
        multiline
        fullWidth
        {...register('aboutMe')}
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
            {...register(`contacts.${item as keyof IProfileContacts}`)}
          />
        ))}
      </section>
      <section className={classes.formButtons}>
        <Button type="submit" size="small" variant="contained" color="primary">
          Edit Info
        </Button>
        <Button variant="outlined" size="small" color="primary" onClick={setEditMode}>
          Cancel
        </Button>
      </section>
    </form>
  )
}

export default ProfileDataForm
