import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
// import actions from "./action";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "@/types/LoginPayload";
import { GetProfilePayload } from "@/types/GetProfilePayload";
import { isFunction } from '../../utils/Utils';
import {
  LoginApi,
  GetProfileApi,
  GetNewAccessTokenApi,
  SignupApi,
} from "@/api/AuthApi";
import {
  loginAction,
  loginActionSuccess,
  getProfileAction,
  getProfileActionSuccess,
  getProfileActionError,
  getAccessTokenByRefreshTokenAction,
  // getAccessTokenByRefreshTokenActionSuccess,
  registerAction,
  registerActionSuccess,
} from "./slice";

function* watchLogin() {
  yield takeLatest(loginAction.type, function* ({ payload }: PayloadAction<LoginPayload>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    try {
      const res = yield call(LoginApi, data);
      if (res.status === HttpCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            loginActionSuccess({
              data: res?.data?.data,
            })
          );
          onSuccess && onSuccess();
        }
      }
      if (res.status === HttpCode.BAD_REQUEST) {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
    } finally {
    }
  });
}

function* watchGetProfile() {
  yield takeEvery(getProfileAction.type, function* ({ payload }: PayloadAction<GetProfilePayload>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    try {
      const res = yield call(GetProfileApi);
      if (res.status === HttpCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            getProfileActionSuccess({
              data: res?.data?.data,
            })
          );
          // isFunction(payload.onSuccess) && payload.onSuccess(res?.data?.data);
        }
        yield put(
          getProfileActionError()
        );

      }
      yield put(
        getProfileActionError()
      );
    } catch (error) {
      onError && onError(error);
    }
  });
}

function* watchRegister() {
  yield takeLatest(registerAction.type, function* ({ payload }: any): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    try {
      const res = yield call(SignupApi, data);
      if (res.status === HttpCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            registerActionSuccess({
              // data: res?.data?.data,
            })
          );
          onSuccess && onSuccess();
        }
        else if (res?.data?.statusCode == ApiCode.FAILURE) {
          onError && onError(res?.data?.message);
        }
      }
      if (res.status === HttpCode.BAD_REQUEST) {
        onError && onError(res?.data?.message);
      }
    } catch (error) {
      onError && onError();
    }
  });
}

function* watchGetNewAccessToken() {
  yield takeEvery(getAccessTokenByRefreshTokenAction.type, function* ({ payload }: any): Generator<any, void, any> {
    const { onSuccess, onError } = payload;
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token === null) {
        onError && onError();
        return;
      }
      const res = yield call(GetNewAccessTokenApi, refresh_token);
    } catch (error) {
      onError && onError();
    }
  });
}

export default function* AuthSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetProfile),
    fork(watchGetNewAccessToken),
    fork(watchRegister),
  ]);
}
