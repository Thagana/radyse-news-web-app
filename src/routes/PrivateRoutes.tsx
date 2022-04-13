import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Network from "../services/index";

const PrivateRoute = ({ component: Component, ...rest}: any): JSX.Element => {
  
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken") || '';

    Network.checkToken(token).then((response) => {
        if (response) {
          setValid(true);
        } else {
          setValid(false);
        }
      }).catch((error: unknown) => {
        console.log(error);
        setValid(false);
      });
  }, []);

  if (!valid) {
    return <Navigate to='/login' />
  }

  return <Outlet />;
}

export default PrivateRoute