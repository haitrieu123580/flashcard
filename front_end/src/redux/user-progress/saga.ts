import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getUserLearningSetProgressApi,
  getUserProgressApi,
  updateUserProgressApi,
} from '@/api/UserProgressApi';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import {
  getUserLearningSetProgressAction,
  getUserLearningSetProgressErrorAction,
  getUserLearningSetProgressSuccessAction,
  getUserProgressAction,
  getUserProgressErrorAction,
  getUserProgressSuccessAction,
  updateUserProgressAction,
  updateUserProgressErrorAction,
  updateUserProgressSuccessAction,
} from './slice';

function* watchUpdateUserProgress() {
  yield takeLatest(
    updateUserProgressAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, onError, onSuccess } = payload;
      try {
        const res = yield call(updateUserProgressApi, {
          setId: data.setId,
          cardId: data.cardId,
        });
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              updateUserProgressSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(onError) &&
          onError(error?.response?.data?.message || 'Error');
        yield put(updateUserProgressErrorAction());
      }
    },
  );
}

function* watchGetUserLearningSetProgress() {
  yield takeLatest(
    getUserLearningSetProgressAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, onError, onSuccess } = payload;
      try {
        const res = yield call(getUserLearningSetProgressApi, data.setId);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              getUserLearningSetProgressSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(onError) &&
          onError(error?.response?.data?.message || 'Error');
        yield put(getUserLearningSetProgressErrorAction());
      }
    },
  );
}

function* watchGetUserLearningProgress() {
  yield takeLatest(
    getUserProgressAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { onError, onSuccess } = payload;
      try {
        const res = yield call(getUserProgressApi);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              getUserProgressSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(onError) &&
          onError(error?.response?.data?.message || 'Error');
        yield put(getUserProgressErrorAction());
      }
    },
  );
}

export default function* UserProgressSaga() {
  yield all([
    fork(watchUpdateUserProgress),
    fork(watchGetUserLearningSetProgress),
    fork(watchGetUserLearningProgress),
  ]);
}
