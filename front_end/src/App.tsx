import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import { Toaster } from "@/components/ui/toaster"
// import CustomRouterProvider from "@/routes/CustomRouterProvider";
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackRenderer from "@/components/common/error-fallback-render/ErrorFallbackRenderer";
import initStore from '@/redux/store';
import { Suspense } from 'react';
import { publicRoutes, protectedRoutes, privateRouters } from '@/routes/MainRouters'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import RequireAuth from '@/components/common/RequireAuth';
import Constants from '@/lib/Constants';
import AdminLayout from '@/components/layout/AdminLayout';
import PageNotFound from '@/components/common/PageNotFound';
import MainLayout from '@/components/layout/MainLayout';
const store = initStore()

function App() {
  return (
    <div className='App'>
      <div className='dark:bg-[#0a092d] bg-gray-100 overflow-hidden'>
        <Provider store={store}>
          <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
            <ThemeProvider>
              <Toaster />
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
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </div>
    </div>
  );
}

export default App;