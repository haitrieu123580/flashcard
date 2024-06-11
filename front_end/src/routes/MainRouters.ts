import { lazy } from 'react';

import AdminLayout from '@/components/layout/AdminLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';

import { routerPaths } from './path';

const Home = lazy(() => import('@/pages/home/Home'));
const ForgotPassword = lazy(
  () => import('@/pages/forgot-password/ForgotPasswordPage'),
);
const PublicSets = lazy(() => import('@/pages/public-sets/PublicSets'));
const LearnFlashcard = lazy(
  () => import('@/pages/learn-flashcard/LearnFlashcard'),
);
const UnAuthorized = lazy(() => import('@/components/common/UnAuthorized'));
const Profile = lazy(() => import('@/pages/profile/Profile'));

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const SetsList = lazy(() => import('@/pages/admin/sets/SetsList'));
const AccountListsContainer = lazy(
  () => import('@/pages/admin/account/AccountsListContainer'),
);
const EditSetContainer = lazy(
  () => import('@/pages/admin/sets/EditSetContainer'),
);
const TestListPage = lazy(
  () => import('@/pages/admin/tests/tests-list/TestListPage'),
);
const QuestionListEditPage = lazy(
  () => import('@/pages/admin/tests/edit-questions-list/QuestionsListEditPage'),
);
const AdminLogin = lazy(() => import('@/pages/admin/login/AdminLogin'));
const PendingSetsListPage = lazy(
  () => import('@/pages/admin/pending-set/PendingSetListPage'),
);
const PendingSetPage = lazy(
  () => import('@/pages/admin/pending-set/PendingSetPage'),
);
const KitsListPage = lazy(
  () => import('@/pages/admin/tests/kits-list/KitsListPage'),
);

const MultipleChoiceTestPage = lazy(
  () => import('@/pages/test/test-page/MultipleChoiceTestPage'),
);
const MultipleChoiceResultPage = lazy(
  () => import('@/pages/test/result-page/MultipleChoiceResultPage'),
);
const MySetsList = lazy(() => import('@/pages/user/my-sets/MySetsList'));
const LearnMySet = lazy(() => import('@/pages/user/learn-myset/LearnMySet'));
const CreateMySet = lazy(() => import('@/pages/user/create-set/CreateMySet'));
const EditMySet = lazy(() => import('@/pages/user/edit-set/EditMySet'));
const UserLearningProgressPage = lazy(
  () => import('@/pages/user/user-progress/UserLearningProgressPage'),
);
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
  {
    path: routerPaths.TEST_MULTIPLE_CHOICE,
    component: MultipleChoiceTestPage,
    layout: MainLayout,
  },
  {
    path: routerPaths.ADMIN_LOGIN,
    component: AdminLogin,
    layout: MainLayout,
  },
  {
    path: routerPaths.ADMIN,
    component: AdminLogin,
    layout: MainLayout,
  },
];
const protectedRoutes = [
  {
    path: routerPaths.PROFILE,
    component: Profile,
    layout: AuthLayout,
  },
  {
    path: routerPaths.USER_SETS,
    component: MySetsList,
    layout: AuthLayout,
  },
  {
    path: routerPaths.LEARN_MY_SET,
    component: LearnMySet,
    layout: AuthLayout,
  },
  {
    path: routerPaths.CREATE_MY_SET,
    component: CreateMySet,
    layout: AuthLayout,
  },
  {
    path: routerPaths.USER_SETS,
    component: MySetsList,
    layout: AuthLayout,
  },
  {
    path: routerPaths.EDIT_MY_SET,
    component: EditMySet,
    layout: AuthLayout,
  },
  {
    path: routerPaths.USER_PROGRESS,
    component: UserLearningProgressPage,
    layout: AuthLayout,
  },
  {
    path: routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT,
    component: MultipleChoiceResultPage,
    layout: MainLayout,
  },
];

const privateRouters = [
  {
    path: routerPaths.ADMIN_DASHBOARD,
    component: AdminDashboard,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_SETS,
    component: SetsList,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_ACCOUNTS,
    component: AccountListsContainer,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_SETS_EDIT,
    component: EditSetContainer,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_SETS_MULTIPLE_CHOICE_TEST,
    component: TestListPage,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_SETS_MULTIPLE_CHOICE_EDIT,
    component: QuestionListEditPage,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_PENDING_SETS,
    component: PendingSetsListPage,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_PENDING_SET,
    component: PendingSetPage,
    layout: AdminLayout,
  },
  {
    path: routerPaths.ADMIN_TEST_KITS_IN_SET,
    component: KitsListPage,
    layout: AdminLayout,
  },
];
export { publicRoutes, protectedRoutes, privateRouters };
