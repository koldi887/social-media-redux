import React from "react";
import Header from "./Header";
import { logOut } from "../../../redux/auth-reducer";
import { useDispatch } from "react-redux";

export default function HeaderContainer() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return <Header />;
}
