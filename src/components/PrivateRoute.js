import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (!token || !user || user.role !== allowedRole) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
