import { ReactNode } from 'react';
import {Navigate} from 'react-router-dom';
import { Page } from '../../const';

type PrivateRouteProps = {
  children: ReactNode;
  isAuth: boolean;
};

function PrivateRoute({children, isAuth}: PrivateRouteProps) {
  return isAuth ? children : <Navigate to={`/${Page.Login}`} />;
}

export default PrivateRoute;
