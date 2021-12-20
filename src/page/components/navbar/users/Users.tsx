import React from "react";
import classes from "./users.module.css";
import Grid from "@material-ui/core/Grid";
import PreLoader from "../../common/Preloader/Preloader";
import { PaginationContainer } from "../../common/pagination/PaginationContainer";
import User from "./User";
import { IUser } from "../../../../models/IUser";
import { IPropsPagination } from "./UsersContainer";

interface IProps {
  users: Array<IUser>;
  isAuth: boolean;
  isFetching: boolean;
  followHandler: (value: IUser) => void;
  pagination: IPropsPagination;
}

const Users: React.FC<IProps> = ({
  users,
  isAuth,
  isFetching,
  followHandler,
  pagination,
}) => {
  return (
    <Grid container className={classes.usersPageContainer}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        className={classes.usersPageTitleBlock}
      >
        <h2>Members</h2>
      </Grid>
      {isFetching ? <PreLoader /> : null}
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          followHandler={followHandler}
          isAuth={isAuth}
        />
      ))}
      <PaginationContainer
        itemsPerPage={pagination.usersPerPage}
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        currentState={pagination.users}
      />
    </Grid>
  );
};

export default Users;
