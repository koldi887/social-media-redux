import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { authSelector } from "../redux/auth-reducer";
import { Login } from "../page/components/login/Login";

const ProtectedRoutes = () => {
  const location = useLocation();
  const {isAuth} = useAppSelector(authSelector)
  console.log(isAuth)
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;