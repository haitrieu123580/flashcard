import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getRecommendSetstBySetIdApi } from '@/api/RecommendSets';
import {
  getMultipleChoiceTestBySetIdApi,
  submitMultipleChoiceTestApi,
} from '@/api/TestApi';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import {
  getRecommendSetsBySetIdAction,
  getRecommendSetsBySetIdActionSuccess,
  getRecommendSetsBySetIdErrorAction,
} from './slice';

function* watchGetRecommendSetsBySetId() {
  yield takeLatest(
    getRecommendSetsBySetIdAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { id, onSuccess, onError } = payload;
      try {
        const res = yield call(getRecommendSetstBySetIdApi, id);
        if (res.status === ErrorCode.OK && res.data) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data);
          yield put(
            getRecommendSetsBySetIdActionSuccess({
              data: res.data,
            }),
          );
          // if (res.data.statusCode === ApiCode.SUCCESS) {

          // } else if (
          //   res.data.statusCode === ApiCode.FAILURE ||
          //   res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN
          // ) {
          //   isFunction(payload.onError) && payload.onError(res.data.message);
          //   yield put(getRecommendSetsBySetIdErrorAction());
          // }
        } else {
          isFunction(payload.onError) && payload.onError(res.data?.message);
          yield put(getRecommendSetsBySetIdErrorAction());
        }
      } catch (error) {
        // isFunction(payload.onError) && payload.onError(res.data?.message);
        yield put(getRecommendSetsBySetIdErrorAction());
      } finally {
      }
    },
  );
}

export default function* recommendSaga() {
  yield all([fork(watchGetRecommendSetsBySetId)]);
}
