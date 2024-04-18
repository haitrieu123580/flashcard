import { routerPaths } from './path';
import { Suspense } from 'react';
import { publicRoutes, protectedRoutes, privateRouters } from './MainRouters'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import RequireAuth from '@/components/common/RequireAuth';
import Constants from '@/lib/Constants';
import AdminLayout from '@/components/layout/AdminLayout';
import PageNotFound from '@/components/common/PageNotFound';
import MainLayout from '@/components/layout/MainLayout';

const CustomRouterProvider = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <MainLayout />
                        }
                    >
                        <>
                            {publicRoutes.map((route: any, index: number) => {
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Page />
                                        }
                                    />
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
                                    <RequireAuth allowedRoles={[Constants.ROLE.USER, Constants.ROLE.ADMIN]}>
                                        <route.component />
                                    </RequireAuth>
                                }
                            />
                        ))}
                    </Route>
                    <Route
                        path='/admin'
                        element={
                            <AdminLayout />
                        }
                    >
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
                        path='*'
                        element={
                            <MainLayout>
                                <PageNotFound />
                            </MainLayout>
                        }
                    />
                </Routes>
            </Suspense>
        </Router >
    )
}

export default CustomRouterProvider