import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { useAuthorizationStatus } from '../../Store/selectors.ts';

export const PrivateRoute = () => {
  const authStatus = useAuthorizationStatus();
  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  );
};
