import { all } from 'redux-saga/effects'
import TestSaga from "@/redux/test/saga";
import AuthSaga from '@/redux/auth/saga';
import PasswordResetSaga from '@/redux/forgot-password/saga';
import PublicSetsSaga from '@/redux/public-sets/saga';
import SetSaga from '@/redux/set/saga';
import CardSaga from '@/redux/card/saga';
import QuestionSaga from '@/redux/question/saga';
import UserSetsSaga from "@/redux/user-sets/saga";
import UserCardSaga from '@/redux/user-cards/saga';
import UserProfileSaga from '@/redux/user-profile/saga';
import UserProgressSaga from '@/redux/user-progress/saga';
import UserTestSaga from '@/redux/user-tests/saga';
import ApproveSetSaga from '@/redux/approve-sets/saga'
export default function* rootSaga() {
    yield all([
        TestSaga(),
        AuthSaga(),
        PasswordResetSaga(),
        PublicSetsSaga(),
        SetSaga(),
        CardSaga(),
        QuestionSaga(),
        UserSetsSaga(),
        UserCardSaga(),
        UserProfileSaga(),
        UserProgressSaga(),
        UserTestSaga(),
        ApproveSetSaga(),
    ])
}