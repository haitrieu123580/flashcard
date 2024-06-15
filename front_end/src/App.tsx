import './i18n';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import {
  privateRouters,
  protectedRoutes,
  publicRoutes,
} from '@/routes/MainRouters';
import { ErrorBoundary } from 'react-error-boundary';
// import CustomRouterProvider from "@/routes/CustomRouterProvider";
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ErrorFallbackRenderer from '@/components/common/error-fallback-render/ErrorFallbackRenderer';
import PageNotFound from '@/components/common/PageNotFound';
import RequireAuth from '@/components/common/RequireAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from '@/components/themes/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import initStore from '@/redux/store';
import Constants from '@/lib/Constants';

const store = initStore();

function App() {
  return (
    <div className="App">
      <div className="overflow-hidden bg-[#e4e9f7] dark:bg-[#0a092d] !bg-blue-200/90">
        <Provider store={store}>
          <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
            <ThemeProvider>
              <Toaster />
              <Router>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<MainLayout />}>
                      <>
                        {publicRoutes.map((route: any, index: number) => {
                          const Page = route.component;
                          return (
                            <Route
                              key={index}
                              path={route.path}
                              element={<Page />}
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
                            <RequireAuth
                              allowedRoles={[
                                Constants.ROLE.USER,
                                Constants.ROLE.ADMIN,
                              ]}
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
                                <RequireAuth
                                  allowedRoles={[Constants.ROLE.ADMIN]}
                                >
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
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </div>
    </div>
  );
}

export default App;
