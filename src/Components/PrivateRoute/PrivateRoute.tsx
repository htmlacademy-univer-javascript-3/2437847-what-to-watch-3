import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { useAuthorizationStatusSelector } from '../../Store/User/selectors.ts';

export const PrivateRoute = () => {
  const authStatus = useAuthorizationStatusSelector();
  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  );
};
