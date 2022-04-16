import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (): JSX.Element => {
  
    const token = localStorage.getItem("authToken") || '';

  if (!token) {
    return <Navigate to='/login' />
  }

  return <Outlet />;
}

export default PrivateRoute