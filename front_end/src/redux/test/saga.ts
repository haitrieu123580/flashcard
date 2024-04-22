import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { isFunction } from "@/lib/utils";

import {
  getTestBySetIdAction,
  getTestBySetIdActionSuccess,
  submitAnswersAction,
  submitAnswersActionSuccess,
  getTestBySetIdErrorAction
} from "./slice";

import {
  getMultipleChoiceTestBySetIdApi,
  submitMultipleChoiceTestApi,
} from "@/api/TestApi";
function* watchGetTestBySetId() {
  yield takeLatest(getTestBySetIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onSuccess, onError } = payload;
    try {
      const res = yield call(getMultipleChoiceTestBySetIdApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            getTestBySetIdActionSuccess
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
          yield put(getTestBySetIdErrorAction())
        }
      }
    } catch (error) {
    } finally {
    }
  });
}
function* watchSubmitMultipleChoiceTest() {
  yield takeLatest(submitAnswersAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, onSuccess, onError } = payload;
    try {
      const res = yield call(submitMultipleChoiceTestApi, data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            submitAnswersActionSuccess
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }
    } catch (error) {
    } finally {
    }
  });
}
export default function* TestSaga() {
  yield all([
    fork(watchGetTestBySetId),
    fork(watchSubmitMultipleChoiceTest),
  ]);
}