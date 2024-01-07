import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/auth.ts';
import { useAuthorizationStatusSelector } from '../../store/user/selectors.ts';
import { Loader } from '../loader/loader.tsx';

export const PrivateRoute = () => {
  const authStatus = useAuthorizationStatusSelector();

  return authStatus === AuthorizationStatus.NoAuth ? (
    <Navigate to={'/login'} />
  ) : (
    <Loader isLoading={authStatus === AuthorizationStatus.Unknown}>
      <Outlet />
    </Loader>
  );
};
