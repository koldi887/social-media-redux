import React, { useState } from 'react'
import classes from './ProfileStatus.module.css'
import { useAppDispatch } from '../../../../hooks/redux'
import { Button, TextField } from '@material-ui/core'
import { updateProfileStatus } from '../../../../redux/profile-reducer'

interface IStatusProps {
  setStatusToggle: () => void
}

const ProfileStatus: React.FC<IStatusProps> = ({ setStatusToggle }) => {
  const dispatch = useAppDispatch()
  const [newStatus, setNewStatus] = useState('')

  const onStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewStatus(e.target.value)
  }

  const onStatusSave = () => {
    dispatch(updateProfileStatus(newStatus))
    setStatusToggle()
  }

  return (
    <div className={classes.statusContainer}>
      <i className={`fas fa-times fa-lg ${classes.closeIcon}`} onClick={setStatusToggle} />
      <TextField
        fullWidth
        label="New status"
        variant="outlined"
        color="primary"
        size="small"
        onChange={(e) => onStatusChange(e)}
      />
      <Button variant="contained" color={'primary'} size={'small'} onClick={onStatusSave}>
        Save
      </Button>
    </div>
  )
}
export default ProfileStatus
