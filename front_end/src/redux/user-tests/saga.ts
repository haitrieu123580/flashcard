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
} from "./slice";

import {
  createQuestionsBySetId
} from "@/api/UserTestApi";
function* watchCreateQuestionsBySetId() {
  yield takeLatest(createQuestionsBySetIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onSuccess, onError } = payload;
    try {
      const res = yield call(createQuestionsBySetId, id);
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

export default function* UserTestSaga() {
  yield all([
    fork(watchCreateQuestionsBySetId),
  ]);
}