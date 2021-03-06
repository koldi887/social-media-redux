import React, {useEffect} from "react";
import classes from "./ProfilePage.module.css";
import {useLocation, useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileImage from "./ProfileImage/ProfileImage";
import {MyPosts} from "./MyPosts/MyPosts";
import {Users} from "../components/Users/Users";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {usePrevLocation} from "../../hooks/usePrevLocation";
import {
    getUserProfile
} from "../../redux/reducers/profileReducer/profile-reducer";

const ProfilePage = () => {
    const {userId} = useParams<string>();
    const authorizedUserId = useAppSelector((state) => state.auth.id);

    const location = useLocation();
    const prevLocation = usePrevLocation(location.pathname);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) dispatch(getUserProfile(Number(userId)));
        if (prevLocation !== undefined && !userId)
            dispatch(getUserProfile(authorizedUserId));
    }, [userId]);

    return (
        <div className={classes.profilePageWrapper}>
            <div className={classes.profileImageWrapper}>
                <ProfileImage paramsUserId={userId}/>
            </div>
            <div className={classes.infoWrapper}>
                <ProfileInfo paramsUserId={userId}/>
                {!userId && (
                    <div className={classes.postsWrapper}>
                        <MyPosts/>
                    </div>
                )}
            </div>
            <div className={classes.usersWrapper}>
                <Users/>
            </div>
        </div>
    );
};

export default ProfilePage;
