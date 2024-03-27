import { all } from 'redux-saga/effects'
import TestSaga from "@/redux/test/saga";
import AuthSaga from '@/redux/auth/saga';
import PasswordResetSaga from '@/redux/forgot-password/saga';
import PublicSetsSaga from '@/redux/public-sets/saga';
import NewestSetsSaga from '@/redux/newest-sets/saga';
import SetSaga from '@/redux/get-set/saga';
export default function* rootSaga() {
    yield all([
        TestSaga(),
        AuthSaga(),
        PasswordResetSaga(),
        PublicSetsSaga(),
        NewestSetsSaga(),
        SetSaga(),
    ])
}