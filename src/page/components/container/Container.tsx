import React, { useEffect } from "react";
import { initializeApp, initialSlice } from "../../../redux/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import PreLoader from "../common/Preloader/Preloader";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Login } from "../login/Login";

export default function Container() {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(initialSlice);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp());
    }
  }, [dispatch, initialized]);

  if (!initialized) return <PreLoader />;
  return (
    <div>
      {/*<Grid item xs={12} sm={12} md={12}>*/}
      {/*  <Navbar />*/}
      {/*</Grid>*/}
      <Routes>
        {/*<Route path="/" element={<Main />} />*/}
        {/*<Route path="/Profile" element={<Profile />}>*/}
        {/*  <Route path=":userId" />*/}
        {/*</Route>*/}
        {/*<Route path="/Dialogs" element={<DialogsContainer />} />*/}
        {/*<Route path="/Users" element={<UsersContainer />} />*/}
        {/*<Route path="/Music" element={<Music />} />*/}
        {/*<Route path="/Settings" element={<Settings />} />*/}
        <Route path="/login" element={<Login />} />
        {/*<Route path="/register" element={<Register />} />*/}
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Routes>
    </div>
  );
}
