import { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const hasAccess = useRef(true);
  return hasAccess.current ? <Outlet /> : <Navigate to={'/login'} />;
};
