export const routerPaths = {
    HOME: '/',
    LOGIN: '/login',
    PROFILE: '/user/profile',
    FORGOT_PASSWORD: '/forgot-password',
    PUBLIC_SETS: '/public-sets',
    LEARN_FLASHCARD: '/learn-flashcard/:id',
    UNAUTHORIZED: '/unauthorized',

    ADMIN: "/admin",
    ADMIN_LOGIN: "/admin/login",
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_SETS: '/admin/sets',
    ADMIN_ACCOUNTS: '/admin/account',
    ADMIN_SETS_EDIT: '/admin/sets/edit/:id',
    ADMIN_PENDING_SETS: '/admin/pending-sets',
    ADMIN_PENDING_SET: '/admin/pending-set/:id',
    ADMIN_SETS_MULTIPLE_CHOICE_TEST: '/admin/sets/multiple-choice-test',
    ADMIN_SETS_MULTIPLE_CHOICE_EDIT: '/admin/sets/multiple-choice-test/edit/:id',

    TEST_MULTIPLE_CHOICE: '/multiple-choice/:id',

    USER_SETS: '/user/my-sets',
    LEARN_MY_SET: '/user/learn-myset/:id',
    CREATE_MY_SET: '/user/create-myset',
    EDIT_MY_SET: '/user/edit-myset/:id',
    USER_PROGRESS: '/user/progress',
    USER_TEST_MULTIPLE_CHOICE_RESULT: '/user/multiple-choice-result/:id',
}
