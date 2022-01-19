import React from 'react'
import classes from './ProfileInfoData.module.css'
import { IProfileContacts, IProfileData, profileData } from '../../../../types/IProfileData'
import { Button } from '@material-ui/core'
import { capitalize } from '../../../../utils/capitalize'

interface IProfileInfoProps {
  profile: IProfileData
  paramsUserId: string | undefined
  setEditMode: () => void
}

const ProfileInfoData: React.FC<IProfileInfoProps> = ({ profile, paramsUserId, setEditMode }) => {
  return (
    <div className={classes.infoListContainer}>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
      </div>

      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>

      {Object.keys(profile.contacts).map((key) => {
        return (
          <div key={key}>
            <b>{capitalize(key)}</b>: {profile.contacts[key as keyof IProfileContacts]}
          </div>
        )
      })}

      {!paramsUserId && (
        <Button size="small" variant="contained" color="primary" onClick={setEditMode}>
          Edit Profile
        </Button>
      )}
    </div>
  )
}

export default ProfileInfoData
