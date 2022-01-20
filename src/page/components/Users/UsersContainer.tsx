import React, { useEffect } from 'react'
import { followUnfollowUser, requestUsers, usersSelector } from '../../../redux/users-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { authSelector } from '../../../redux/auth-reducer'
import { useLocation, useSearchParams } from 'react-router-dom'
import { friendParamValueConvert } from '../../../utils/friendParamValueConvert'
import Users from './Users'
import { ROUTE } from '../../../routes/routing'

const UsersContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { users, isFetching, filter, totalUsersCount, currentPage, pageSize } =
    useAppSelector(usersSelector)
  const { isAuth } = useAppSelector(authSelector)

  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const searchTerm = searchParams.get('term')
    const searchFriend = friendParamValueConvert(searchParams.get('friend'))
    const searchPage = Number(searchParams.get('page'))

    let actualPage = currentPage
    let actualFilter = filter

    if (searchPage) actualPage = searchPage
    if (searchTerm) actualFilter = { ...actualFilter, term: searchTerm }
    if (searchFriend) actualFilter = { ...actualFilter, friend: searchFriend }

    dispatch(requestUsers({ page: actualPage, pageSize, filter: actualFilter }))
  }, [])

  useEffect(() => {
    if (location.pathname === ROUTE.USERS) {
      let actualParams = {}
      if (filter.term) actualParams = { term: filter.term }
      if (filter.friend !== null) {
        actualParams = { ...actualParams, friend: filter.friend }
      }
      if (currentPage !== 1) {
        actualParams = { ...actualParams, page: currentPage }
      }
      setSearchParams(actualParams)
    }
  }, [filter, currentPage])

  const onUserFollow = (userId: number, followed: boolean) => {
    dispatch(followUnfollowUser({ userId, followed }))
  }

  const onPageChanged = (currentPage: number) => {
    dispatch(requestUsers({ pageSize, page: currentPage, filter }))
  }

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
  )
}

export default UsersContainer
