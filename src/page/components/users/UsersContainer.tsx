import React, { useEffect, useState } from "react";
import {
  followUnfollowUser,
  requestUsers,
  usersSelector,
} from "../../../redux/users-reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { authSelector } from "../../../redux/auth-reducer";
import { IUser } from "../../../models/IUser";
import Users from "./Users";

const UsersContainer = () => {
  const dispatch = useAppDispatch();

  const { users, isFetching } = useAppSelector(usersSelector);
  const { isAuth } = useAppSelector(authSelector);
  const { totalUsersCount } = useAppSelector(usersSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);

  const onUserFollow = (user: IUser) => {
    dispatch(followUnfollowUser(user));
  };

  const onPageChanged = (currentPage: number) => {
    setCurrentPage(currentPage);
    dispatch(requestUsers({ pageSize, currentPage }));
  };

  useEffect(() => {
    dispatch(requestUsers({ pageSize, currentPage }));
  }, [dispatch]);

  return (
    <Users
      onUserFollow={onUserFollow}
      isAuth={isAuth}
      users={users}
      isFetching={isFetching}
      totalUsersCount={totalUsersCount}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChanged={onPageChanged}
    />
  );
};

export default UsersContainer;
