import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { authSelector } from "../redux/reducers/authReducer/auth-reducer";
import { ROUTE } from "./routes";

export const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuth } = useAppSelector(authSelector);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE.LOGIN} replace state={{ from: location }} />
  );
};
