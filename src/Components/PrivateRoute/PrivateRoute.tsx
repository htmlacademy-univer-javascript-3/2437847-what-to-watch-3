import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { useAuthorizationStatusSelector } from '../../Store/User/selectors.ts';
import { Loader } from '../Loader/Loader.tsx';

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
