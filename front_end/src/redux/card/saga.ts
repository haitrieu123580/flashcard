import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/lib/utils";
import {
  editCardAction,
  editCardSuccessAction,
  createCardAction,
  createCardSuccessAction,
  deleteCardAction,
  deleteCardSuccessAction,
} from "./slice";
import {
  editCardApi,
  createCardApi,
  deleteCardApi,
} from "@/api/CardApi";

function* watchEditCard() {
  yield takeLatest(editCardAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, id, onError, onSuccess } = payload
    try {
      const res = yield call(editCardApi, { id, data });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            editCardSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }
      else {
        isFunction(payload.onError) && payload.onError(res.data.message);
      }
    } catch (error) {
      isFunction(onError) && onError("Internal server error");
    }
  });
}

function* watchCreateCard() {
  yield takeLatest(createCardAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, onError, onSuccess } = payload
    try {
      const res = yield call(createCardApi, data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            createCardSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }
      else {
        isFunction(payload.onError) && payload.onError(res.data.message);
      }
    } catch (error) {
      isFunction(onError) && onError("Internal server error");
    }
  });
}

function* watchDeleteCard() {
  yield takeLatest(deleteCardAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onError, onSuccess } = payload
    try {
      const res = yield call(deleteCardApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            createCardSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }
      else {
        isFunction(payload.onError) && payload.onError(res.data.message);
      }
    } catch (error) {
      isFunction(onError) && onError("Internal server error");
    }
  });
}

export default function* CardSaga() {
  yield all([
    fork(watchEditCard),
    fork(watchCreateCard),
    fork(watchDeleteCard),
  ]);
}
