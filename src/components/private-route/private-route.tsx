import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Page, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: ReactNode;
  authorizationStatus: AuthorizationStatus;
};

function PrivateRoute({children, authorizationStatus}: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={Page.Login} />;
}

export default PrivateRoute;
