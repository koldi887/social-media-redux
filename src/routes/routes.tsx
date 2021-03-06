import React from "react";
import { Main } from "../page/components/Main/Main";
import { Login } from "../page/components/Login/Login";
import { Register } from "../page/components/Register/Register";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { withSuspense } from "../hoc/withSuspense";
import { Users } from "../page/components/Users/Users";
import { Music } from "../page/components/Music/Music";
import { Settings } from "../page/components/Settings/Settings";
import { HelpPage } from "../page/components/Help/HelpPage";
import { Dialogs } from "../page/components/Dialogs/Dialogs";

const ProfilePage = React.lazy(
  () => import("../page/profile-page/ProfilePage")
);

export enum ROUTE {
  MAIN = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  PROFILE = `/profile/`,
  USER_PROFILE = "/profile/:userId",
  USERS = "/users",
  MUSIC = "/music",
  HELP = "/help",
  SETTINGS = "/settings",
  DIALOGS = "/dialogs",
  OTHER_ROUTES = "/*",
}

export const MAIN_ROUTE = "MAIN_ROUTE";
export const LOGIN_ROUTE = "LOGIN_ROUTE";
export const REGISTER_ROUTE = "REGISTER_ROUTE";
export const PROFILE_ROUTE = "PROFILE_ROUTE";
export const USER_PROFILE_ROUTE = "USER_PROFILE_ROUTE";
export const USERS_ROUTE = "USERS_ROUTE";
export const MUSIC_ROUTE = "MUSIC_ROUTE";
export const HELP_ROUTE = "HELP_ROUTE";
export const SETTINGS_ROUTE = "SETTINGS_ROUTE";
export const DIALOGS_ROUTE = "DIALOGS_ROUTE";
export const OTHER_ROUTE = "OTHER_ROUTE";
export const PROTECTED_ROUTES = "PROTECTED_ROUTES";

const SuspenseProfilePage = withSuspense(ProfilePage);

export const routesList = [
  {
    id: MAIN_ROUTE,
    path: ROUTE.MAIN,
    element: <Main />,
  },
  {
    id: REGISTER_ROUTE,
    path: ROUTE.REGISTER,
    element: <Register />,
  },
  {
    id: LOGIN_ROUTE,
    path: ROUTE.LOGIN,
    element: <Login />,
  },
  {
    id: PROTECTED_ROUTES,
    element: <ProtectedRoutes />,
    children: [
      {
        id: PROFILE_ROUTE,
        path: ROUTE.PROFILE,
        element: <SuspenseProfilePage />,
      },
      {
        id: USER_PROFILE_ROUTE,
        path: ROUTE.USER_PROFILE,
        element: <SuspenseProfilePage />,
      },
      {
        id: USERS_ROUTE,
        path: ROUTE.USERS,
        element: <Users />,
      },
      {
        id: MUSIC_ROUTE,
        path: ROUTE.MUSIC,
        element: <Music />,
      },
      {
        id: SETTINGS_ROUTE,
        path: ROUTE.SETTINGS,
        element: <Settings />,
      },
      {
        id: HELP_ROUTE,
        path: ROUTE.HELP,
        element: <HelpPage />,
      },
      {
        id: DIALOGS_ROUTE,
        path: ROUTE.DIALOGS,
        element: <Dialogs />,
      },
    ],
  },
  {
    id: OTHER_ROUTE,
    path: ROUTE.OTHER_ROUTES,
    element: <Main />,
  },
  {
    id: OTHER_ROUTE,
    path: ROUTE.OTHER_ROUTES,
    element: <Main />,
  },
];

export const getRouteConfig = (id: string) => {
  let childrenRoute;
  const route = routesList.find((r) => r.id === id);

  if (!route) {
    routesList.map((r) => {
      if (r.children) {
        const route = r.children.find((r) => r.id === id);
        if (route) {
          const { element, ...rest } = route;
          childrenRoute = rest;
        } else childrenRoute = null;
      }
    });
    if (!childrenRoute) return;
    return childrenRoute;
  }

  const { element, children, ...rest } = route;
  return rest;
};
