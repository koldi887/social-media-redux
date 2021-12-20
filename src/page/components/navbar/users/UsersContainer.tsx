import React, { useEffect, useState } from "react";
import {
  followUnfollowUser,
  getUsers,
  usersSelector,
} from "../../../../redux/users-reducer";
import Users from "./Users";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { authSelector } from "../../../../redux/auth-reducer";
import { IUser } from "../../../../models/IUser";
import { createPaginationState } from "../../common/pagination/createPaginationState";

export interface IPropsPagination {
  usersPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  users: Array<IUser>;
}

const UsersContainer = () => {
  const dispatch = useAppDispatch();
  const { users, isFetching } = useAppSelector(usersSelector);
  const { isAuth } = useAppSelector(authSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const newArr = createPaginationState(usersPerPage, users, currentPage);
  const pagination = {
    usersPerPage,
    setCurrentPage,
    users,
    currentPage,
  };

  const followHandler = (user: IUser) => {
    dispatch(followUnfollowUser(user));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <Users
        followHandler={followHandler}
        isAuth={isAuth}
        users={newArr}
        isFetching={isFetching}
        pagination={pagination}
      />
    </>
  );
};

export default UsersContainer;
