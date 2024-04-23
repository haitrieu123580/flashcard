import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { routerPaths } from "@/routes/path";
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '@/redux/auth/slice';
const RequireAuth = ({ allowedRoles, children }: { allowedRoles: any, children?: ReactNode }) => {
    const { profile } = useSelector((state: any) => state.Auth);
    const location = useLocation();
    const dispatch = useDispatch();
    return (
        <>
            {allowedRoles.includes(profile?.role)
                // ? <Outlet />
                ? children
                : <Navigate to={routerPaths.UNAUTHORIZED} state={{ from: location }} replace />
                // : null
            }
            {/* <Outlet /> */}
        </>

    );
}

export default RequireAuth;