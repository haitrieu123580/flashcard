import { routerPaths } from './path';
import { Suspense } from 'react';
import { publicRoutes, protectedRoutes, privateRouters } from './MainRouters'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { getProfileAction, getAccessTokenByRefreshTokenAction } from '@/redux/auth/slice';
const CustomRouterProvider = () => {

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {publicRoutes.map((route: any, index: number) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {protectedRoutes.map((route: any, index: number) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    true ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to={routerPaths.HOME} replace={true} />
                                    )
                                }
                            />
                        );
                    })}
                    {privateRouters.map((route: any, index: number) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    true ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to={routerPaths.HOME} replace={true} />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </Router >
    )
}

export default CustomRouterProvider