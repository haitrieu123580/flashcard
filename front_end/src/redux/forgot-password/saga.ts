import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ForgotPasswordApi,
  ResetPasswordApi,
} from "@/api/AuthApi";
import {
  forgotPasswordAction,
  forgotPasswordActionSuccess,
  resetPasswordAction,
  resetPasswordActionSuccess,
} from "./slice";
import { isFunction } from "@/lib/utils";

function* watchForgotPassword() {
  yield takeLatest(forgotPasswordAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    try {
      const res = yield call(ForgotPasswordApi, payload.data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess();
          yield put(
            forgotPasswordActionSuccess({
              data: payload.data,
            })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }

    } catch (error) {
      isFunction(payload.onError) && payload.onError(`Internal server error`);
    }
  });
}

function* watchResetPassword() {
  yield takeLatest(resetPasswordAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    try {
      const res = yield call(ResetPasswordApi, payload.data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess();
          yield put(
            resetPasswordActionSuccess()
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }
    } catch (error) {

    }
  });
}

export default function* passwordResetSaga() {
  yield all([
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
