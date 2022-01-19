import React from 'react'
import classes from './ProfilePage.module.css'
import { useParams } from 'react-router-dom'
import UsersContainer from '../components/Users/UsersContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileImage from './ProfileImage/ProfileImage'
import MyPostsContainer from './MyPosts/MyPostContainer'

const ProfilePage = () => {
  const { userId } = useParams<string>()

  return (
    <div className={classes.profilePageWrapper}>
      <div className={classes.profileImageWrapper}>
        <ProfileImage paramsUserId={userId} />
      </div>
      <div className={classes.infoWrapper}>
        <ProfileInfo paramsUserId={userId} />
        {!userId && (
          <div className={classes.postsWrapper}>
            <MyPostsContainer />
          </div>
        )}
      </div>
      <div className={classes.usersWrapper}>
        <UsersContainer />
      </div>
    </div>
  )
}

export default ProfilePage
