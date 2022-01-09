import React from "react";
import classes from "./Users.module.css";
import PreLoader from "../common/Preloader/Preloader";
import User from "./User";
import { IUser } from "../../../types/IUser";
import { useLocation, useNavigate } from "react-router-dom";
import NewPaginator from "../common/Paginator/Paginator";
import { Button } from "@material-ui/core";

interface IProps {
  users: Array<IUser>;
  isAuth: boolean;
  isFetching: boolean;
  onUserFollow: (value: number, value2: boolean) => void;
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
  onPageChanged: (value: number) => void;
}

const Users: React.FC<IProps> = ({
  users,
  isAuth,
  isFetching,
  onUserFollow,
  totalUsersCount,
  currentPage,
  pageSize,
  onPageChanged,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("dima");
  return (
    <div
      className={
        location.pathname !== "/Users"
          ? classes.usersContainerProfilePage
          : classes.usersPageContainer
      }
    >
      <div className={classes.usersPageTitleBlock}>
        <h2>Users</h2>
      </div>
      <div
        className={`${
          location.pathname !== "/Users"
            ? classes.usersBlockProfilePage
            : classes.usersBlock
        }`}
      >
        {isFetching ? <PreLoader /> : null}
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onUserFollow={onUserFollow}
            isAuth={isAuth}
          />
        ))}
      </div>
      <div>
        {location.pathname === "/Users" ? (
          <NewPaginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
          />
        ) : (
          <Button
            variant="outlined"
            onClick={() => navigate("/Users")}
            color={"primary"}
          >
            Show all users
          </Button>
        )}
      </div>
    </div>
  );
};

export default Users;
