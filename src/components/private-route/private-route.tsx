import { ReactNode } from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({children}: PrivateRouteProps) {
  const hasAccess = true;

  return hasAccess ? children : <Navigate to={'/Login'} />;
}

export default PrivateRoute;
