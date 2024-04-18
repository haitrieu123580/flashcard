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
  createQuestionAction,
  createQuestionSuccessAction,
} from "./slice";

import {
  getQuestionsListBySetIdApi,
  editQuestionApi,
  createQuestionApi,
  deleteQuestionApi,
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
    const { data, id, onError, onSuccess } = payload
    try {
      const res = yield call(editQuestionApi, { id, data });
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

function* watchCreateQuestion() {
  yield takeLatest(createQuestionAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, onError, onSuccess } = payload
    try {
      const res = yield call(createQuestionApi, data);
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
export default function* QuestionSaga() {
  yield all([
    fork(watchGetQuestionsListBySetId),
    fork(watchEditQuestion),
    fork(watchCreateQuestion),
    fork(watchDeleteQuestion),
  ]);
}