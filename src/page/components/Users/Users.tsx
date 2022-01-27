import React, { useEffect } from 'react';
import classes from './Users.module.css';
import PreLoader from '../common/Preloader/Preloader';
import User from './User/User';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { requestUsers, usersSelector } from '../../../redux/users-reducer';
import { ROUTE } from '../../../routes/routing';
import { friendParamValueConvert } from '../../../utils/friendParamValueConvert';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Paginator from '../common/Paginator/Paginator';

const Users: React.FC = () => {
  const { users, isFetching, filter, totalUsersCount, currentPage, pageSize } =
    useAppSelector(usersSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchTerm = searchParams.get('term');
    const searchFriend = friendParamValueConvert(searchParams.get('friend'));
    const searchPage = Number(searchParams.get('page'));

    let actualPage = currentPage;
    let actualFilter = filter;

    if (searchPage) actualPage = searchPage;
    if (searchTerm) actualFilter = { ...actualFilter, term: searchTerm };
    if (searchFriend) actualFilter = { ...actualFilter, friend: searchFriend };

    dispatch(requestUsers({ page: actualPage, pageSize, filter: actualFilter }));
  }, []);

  useEffect(() => {
    if (location.pathname === ROUTE.USERS) {
      let actualParams = {};
      if (filter.term) actualParams = { term: filter.term };
      if (filter.friend !== null) {
        actualParams = { ...actualParams, friend: filter.friend };
      }
      if (currentPage !== 1) {
        actualParams = { ...actualParams, page: currentPage };
      }
      setSearchParams(actualParams);
    }
  }, [filter, currentPage]);

  const onPageChanged = (currentPage: number) => {
    dispatch(requestUsers({ pageSize, page: currentPage, filter }));
  };
  return (
    <div
      className={
        location.pathname !== ROUTE.USERS
          ? classes.usersContainerProfilePage
          : classes.usersPageContainer
      }
    >
      <div className={classes.usersPageTitleBlock}>
        <h2>Users</h2>
      </div>
      <div
        className={`${
          location.pathname !== ROUTE.USERS ? classes.usersBlockProfilePage : classes.usersBlock
        }`}
      >
        {isFetching ? <PreLoader /> : null}
        {!totalUsersCount && !isFetching && <h1>Users not found</h1>}
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
      <div>
        {location.pathname === ROUTE.USERS ? (
          <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
          />
        ) : (
          <Button variant="outlined" onClick={() => navigate(ROUTE.USERS)} color={'primary'}>
            Show all users
          </Button>
        )}
      </div>
    </div>
  );
};

export default Users;
