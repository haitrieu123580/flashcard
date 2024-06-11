import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import PageNotFound from '@/components/common/PageNotFound';
import RequireAuth from '@/components/common/RequireAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import { getProfileAction } from '@/redux/auth/slice';
import Constants from '@/lib/Constants';

import { privateRouters, protectedRoutes, publicRoutes } from './MainRouters';
import { routerPaths } from './path';

const CustomRouterProvider = () => {
  // const { profile } = useSelector((state: any) => state.Auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     if (profile) return;
  //     dispatch({
  //         type: getProfileAction.type,
  //         payload: {
  //             onSuccess: () => {

  //             },
  //             onError: () => {
  //             }
  //         }
  //     })
  // }, [profile])
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <>
              {publicRoutes.map((route: any, index: number) => {
                const Page = route.component;
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                );
              })}
            </>
          </Route>
          <Route path="/user" element={<AuthLayout />}>
            {protectedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <RequireAuth
                    allowedRoles={[Constants.ROLE.USER, Constants.ROLE.ADMIN]}
                  >
                    <route.component />
                  </RequireAuth>
                }
              />
            ))}
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            {privateRouters.map((route: any, index: number) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <>
                      <RequireAuth allowedRoles={[Constants.ROLE.ADMIN]}>
                        <Page />
                      </RequireAuth>
                    </>
                  }
                />
              );
            })}
          </Route>
          <Route
            path="*"
            element={
              <MainLayout>
                <PageNotFound />
              </MainLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default CustomRouterProvider;
