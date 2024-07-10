import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { getToken } from "../config/StorageFunctions";

export const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};
