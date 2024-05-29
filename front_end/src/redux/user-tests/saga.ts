import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { isFunction } from "@/lib/utils";

import {
  createQuestionsBySetIdAction,
  createQuestionsBySetIdSuccessAction,
  createQuestionsBySetIdFailedAction,
  saveUserAnswerAction,
  saveUserAnswerSuccessAction,
  saveUserAnswerFailedAction,
  getTestHistoryBySetIdAction,
  getTestHistoryBySetIdSuccessAction,
  getTestHistoryBySetIdFailedAction,
  getUserTestResultAction,
  getUserTestResultSuccessAction,
  getUserTestResultFailedAction,
} from "./slice";

import {
  createQuestionsBySetId,
  saveUserAnswerTestIdApi,
  getTestHistoryBySetIdApi,
  getUserTestResultApi,
} from "@/api/UserTestApi";
function* watchCreateQuestionsBySetId() {
  yield takeLatest(createQuestionsBySetIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onSuccess, onError, level } = payload;
    try {
      const res = yield call(createQuestionsBySetId, { setId: id, level: level });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            createQuestionsBySetIdSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }
    } catch (error: any) {
      isFunction(onError) && onError(error?.response?.data?.message || 'Error');
      yield put(createQuestionsBySetIdFailedAction());
    }
  });
}

function* watchSaveUserAnswers() {
  yield takeLatest(saveUserAnswerAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, onSuccess, onError } = payload;
    try {
      const res = yield call(saveUserAnswerTestIdApi, data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            saveUserAnswerSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }
    } catch (error: any) {
      isFunction(onError) && onError(error?.response?.data?.message || 'Error');
      yield put(saveUserAnswerFailedAction());
    }
  });
}

function* watchGetTestHistoryBySetId() {
  yield takeLatest(getTestHistoryBySetIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { setId, onSuccess, onError } = payload;
    try {
      const res = yield call(getTestHistoryBySetIdApi, setId);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            getTestHistoryBySetIdSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }
    } catch (error: any) {
      isFunction(onError) && onError(error?.response?.data?.message || 'Error');
      yield put(getTestHistoryBySetIdFailedAction());
    }
  });
}

function* watchGetUserTestResult() {
  yield takeLatest(getUserTestResultAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { testId, onSuccess, onError } = payload;
    try {
      const res = yield call(getUserTestResultApi, testId);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            getUserTestResultSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }
    } catch (error: any) {
      isFunction(onError) && onError(error?.response?.data?.message || 'Error');
      yield put(getUserTestResultFailedAction());
    }
  });
}

export default function* UserTestSaga() {
  yield all([
    fork(watchCreateQuestionsBySetId),
    fork(watchSaveUserAnswers),
    fork(watchGetTestHistoryBySetId),
    fork(watchGetUserTestResult),
  ]);
}