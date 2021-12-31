import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { authSelector } from "../redux/auth-reducer";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuth } = useAppSelector(authSelector);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;