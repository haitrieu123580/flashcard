import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
// import actions from "./action";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "@/types/LoginPayload";
import { GetProfilePayload } from "@/types/GetProfilePayload";
import { isFunction } from "@/lib/utils";
import {
  LoginApi,
  GetProfileApi,
  GetNewAccessTokenApi,
  SignupApi,
  LoginWithOauthApi,
  logoutApi,
} from "@/api/AuthApi";
import {
  loginAction,
  loginActionSuccess,
  loginActionError,
  loginSuccessWithOauthAction,
  getProfileAction,
  getProfileActionSuccess,
  getProfileActionError,
  getAccessTokenByRefreshTokenAction,
  // getAccessTokenByRefreshTokenActionSuccess,
  registerAction,
  registerActionSuccess,
  registerActionError,
  logoutAction,
  logoutSuccessAction,
  logoutErrorsAction,
} from "./slice";

function* watchLogin() {
  yield takeLatest(loginAction.type, function* ({ payload }: PayloadAction<LoginPayload>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    try {
      const res = yield call(LoginApi, data);
      if (res.status === ErrorCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            loginActionSuccess({
              data: res?.data?.data,
            })
          );
          onSuccess && onSuccess(res?.data?.message);
        }
        else {
          onError && onError(res?.data?.message);
          yield put(
            loginActionError()
          );
        }
      }
      if (res.status === ErrorCode.BAD_REQUEST) {
        onError && onError();
        loginActionError()
      }
    } catch (error) {
      onError && onError();
      loginActionError()
    } finally {
    }
  });
}

function* watchGetProfile() {
  yield takeEvery(getProfileAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    try {
      const res = yield call(GetProfileApi);
      if (res.status === ErrorCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            getProfileActionSuccess({
              data: res?.data?.data,
            })
          );
          isFunction(onSuccess) && payload.onSuccess(res?.data?.data);
        }
        else {
          yield put(
            getProfileActionError()
          );
        }

      }
      else {
        yield put(
          getProfileActionError()
        );
      }
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
      if (res.status === ErrorCode.OK) {
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
          yield put(
            registerActionError()
          );
        }
      }
      if (res.status === ErrorCode.BAD_REQUEST) {
        onError && onError(res?.data?.message);
        yield put(
          registerActionError()
        );
      }
    } catch (error) {
      onError && onError();
      yield put(
        registerActionError()
      );
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
function* watchgetAccessTokenWithOauth() {
  yield takeEvery(loginSuccessWithOauthAction.type, function* ({ payload }: any): Generator<any, void, any> {
    const { onSuccess, onError } = payload;
    try {
      const res = yield call(LoginWithOauthApi);
      if (res.status === ErrorCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            loginActionSuccess({
              data: res?.data?.data,
            })
          );
          isFunction(onSuccess) && onSuccess(res?.data?.message);
        }
        else {
          isFunction(onError) && onError(res?.data?.message);
          yield put(
            loginActionError()
          );
        }
      }
      if (res.status === ErrorCode.BAD_REQUEST) {
        isFunction(onError) && onError();
        loginActionError()
      }
    } catch (error) {
      isFunction(onError) && onError();
    }
  });
}
function* watchLogout() {
  yield takeEvery(logoutAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { onSuccess, onError } = payload;
    try {
      const res = yield call(logoutApi);
      console.log(res);
      if (res.status === ErrorCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            logoutSuccessAction()
          );
          isFunction(onSuccess) && payload.onSuccess(res?.data?.data);
        }
        else {
          isFunction(onError) && payload.onError(res?.data?.message);
          yield put(
            logoutErrorsAction()
          );
        }
      }
      else {
        isFunction(onError) && payload.onError();
        yield put(
          logoutErrorsAction()
        );
      }
    } catch (error) {
      isFunction(onError) && payload.onError();
    }
  });
}
export default function* AuthSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetProfile),
    fork(watchGetNewAccessToken),
    fork(watchRegister),
    fork(watchgetAccessTokenWithOauth),
    fork(watchLogout),
  ]);
}
