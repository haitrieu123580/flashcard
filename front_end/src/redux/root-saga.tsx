import { all } from 'redux-saga/effects'
import TestSaga from "@/redux/test/saga";
import AuthSaga from '@/redux/auth/saga';
import PasswordResetSaga from '@/redux/forgot-password/saga';
import PublicSetsSaga from '@/redux/public-sets/saga';
import SetSaga from '@/redux/set/saga';
import CardSaga from '@/redux/card/saga';
import QuestionSaga from '@/redux/question/saga';

export default function* rootSaga() {
    yield all([
        TestSaga(),
        AuthSaga(),
        PasswordResetSaga(),
        PublicSetsSaga(),
        SetSaga(),
        CardSaga(),
        QuestionSaga(),
    ])
}