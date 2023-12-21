import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/auth.ts';
import { useAuthorizationStatusSelector } from '../../store/user/selectors.ts';

export const PrivateRoute = () => {
  const authStatus = useAuthorizationStatusSelector();
  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  );
};
