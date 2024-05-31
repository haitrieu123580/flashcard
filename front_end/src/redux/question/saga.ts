import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { isFunction } from "@/lib/utils";

import {
  getQuestionsListBySetIdAction,
  getQuestionsListBySetIdSuccessAction,
  getQuestionsListBySetIdFailedAction,
  editQuestionAction,
  editQuestionSuccessAction,
  deleteQuestionAction,
  deleteQuestionSuccessAction,
  deleteQuestionErrorAction,
  createQuestionAction,
  createQuestionSuccessAction,
  createQuestionErrorAction,
  createTestKitAction,
  createTestKitSuccessAction,
  createTestKitErrorAction,
} from "./slice";

import {
  getQuestionsListBySetIdApi,
  editQuestionApi,
  createQuestionApi,
  deleteQuestionApi,
  createTestKitApi,
} from "@/api/QuestionApi";
function* watchGetQuestionsListBySetId() {
  yield takeLatest(getQuestionsListBySetIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onSuccess, onError } = payload;
    try {
      const res = yield call(getQuestionsListBySetIdApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            getQuestionsListBySetIdSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(onError) && onError(res.data.message);
          getQuestionsListBySetIdFailedAction();
        }
      }
    } catch (error) {
    } finally {
    }
  });
}
function* watchEditQuestion() {
  yield takeLatest(editQuestionAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, questionId, testKitId, onError, onSuccess } = payload
    try {
      const res = yield call(editQuestionApi, { questionId: questionId, testKitId: testKitId, data: data });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            editQuestionSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(createQuestionErrorAction())
    }
  });
}

function* watchCreateQuestion() {
  yield takeLatest(createQuestionAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, onError, onSuccess, testId } = payload
    try {
      const res = yield call(createQuestionApi, { testId: testId, data: data });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            createQuestionSuccessAction
              ({
                data: res.data?.data
              })
          );
        }

      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(createQuestionErrorAction())
    }
  });
}

function* watchDeleteQuestion() {
  yield takeLatest(deleteQuestionAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onError, onSuccess } = payload
    try {
      const res = yield call(deleteQuestionApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            deleteQuestionSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }
    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(deleteQuestionErrorAction())
    }
  });
}

function* watchCreateTestKit() {
  yield takeLatest(createTestKitAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { level, onError, onSuccess, setId } = payload
    try {
      const res = yield call(createTestKitApi, { setId: setId, level: level });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            createTestKitSuccessAction
              ({
                data: res.data?.data
              })
          );
        }

      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(createQuestionErrorAction())
    }
  });
}

export default function* QuestionSaga() {
  yield all([
    fork(watchGetQuestionsListBySetId),
    fork(watchEditQuestion),
    fork(watchCreateQuestion),
    fork(watchDeleteQuestion),
    fork(watchCreateTestKit)
  ]);
}