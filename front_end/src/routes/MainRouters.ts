import { lazy } from 'react';
import MainLayout from '@/components/layout/MainLayout'
import AuthLayout from '@/components/layout/AuthLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { routerPaths } from './path';
const Home = lazy(() => import('@/pages/home/Home'))
const ForgotPassword = lazy(() => import('@/pages/forgot-password/ForgotPasswordPage'))
const PublicSets = lazy(() => import('@/pages/public-sets/PublicSets'))
const LearnFlashcard = lazy(() => import('@/pages/learn-flashcard/LearnFlashcard'))
const UnAuthorized = lazy(() => import('@/components/common/UnAuthorized'))
const Profile = lazy(() => import('@/pages/profile/Profile'))

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const SetsList = lazy(() => import('@/pages/admin/sets/SetsList'))
const AccountListsContainer = lazy(() => import('@/pages/admin/account/AccountsListContainer'))
const EditSetContainer = lazy(() => import('@/pages/admin/sets/EditSetContainer'))

const publicRoutes = [
    {
        path: routerPaths.HOME,
        component: Home,
        layout: MainLayout,
    },
    {
        path: routerPaths.FORGOT_PASSWORD,
        component: ForgotPassword,
        layout: MainLayout,
    },
    {
        path: routerPaths.PUBLIC_SETS,
        component: PublicSets,
        layout: MainLayout,
    },
    {
        path: routerPaths.LEARN_FLASHCARD,
        component: LearnFlashcard,
        layout: MainLayout,
    },
    {
        path: routerPaths.UNAUTHORIZED,
        component: UnAuthorized,
    },
]
const protectedRoutes = [
    {
        path: routerPaths.PROFILE,
        component: Profile,
        layout: AuthLayout
    },
]

const privateRouters = [
    {
        path: routerPaths.ADMIN_DASHBOARD,
        component: AdminDashboard,
        layout: AdminLayout
    },
    {
        path: routerPaths.ADMIN_SETS,
        component: SetsList,
        layout: AdminLayout
    },
    {
        path: routerPaths.ADMIN_ACCOUNTS,
        component: AccountListsContainer,
        layout: AdminLayout
    },
    {
        path: routerPaths.ADMIN_SETS_EDIT,
        component: EditSetContainer,
        layout: AdminLayout
    },
]
export { publicRoutes, protectedRoutes, privateRouters }