import { ReactNode, useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getProfileAction } from '@/redux/auth/slice';

const RequireAuth = ({
  allowedRoles,
  children,
}: {
  allowedRoles: any;
  children?: ReactNode;
}) => {
  const { profile } = useSelector((state: any) => state.Auth);
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <>
      {
        allowedRoles.includes(profile?.role) ? (
          // ? <Outlet />
          children
        ) : (
          <Navigate
            to={routerPaths.UNAUTHORIZED}
            state={{ from: location }}
            replace
          />
        )
        // : null
      }
      {/* <Outlet /> */}
    </>
  );
};

export default RequireAuth;
