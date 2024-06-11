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
  createUserCardApi,
  deleteUserCardApi,
  editUserCardApi,
} from '@/api/UserCardsApi';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import {
  createUserCardAction,
  createUserCardSuccessAction,
  deleteUserCardAction,
  deleteUserCardSuccessAction,
  editUserCardAction,
  editUserCardSuccessAction,
} from './slice';

function* watchEditCard() {
  yield takeLatest(
    editUserCardAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, id, onError, onSuccess } = payload;
      try {
        const res = yield call(editUserCardApi, { id, data });
        console.log(res);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              editUserCardSuccessAction({
                data: res.data?.data,
              }),
            );
          } else if (
            res.data.statusCode === ApiCode.FAILURE ||
            res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN
          ) {
            isFunction(payload.onError) && payload.onError(res.data.message);
          }
        } else {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      } catch (error) {
        isFunction(onError) && onError('Internal server error');
      }
    },
  );
}

function* watchCreateCard() {
  yield takeLatest(
    createUserCardAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, onError, onSuccess } = payload;
      try {
        const res = yield call(createUserCardApi, data);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              createUserCardSuccessAction({
                data: res.data?.data,
              }),
            );
          } else if (
            res.data.statusCode === ApiCode.FAILURE ||
            res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN
          ) {
            isFunction(payload.onError) && payload.onError(res.data.message);
          }
        } else {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      } catch (error) {
        isFunction(onError) && onError('Internal server error');
      }
    },
  );
}

function* watchDeleteCard() {
  yield takeLatest(
    deleteUserCardAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { id, onError, onSuccess } = payload;
      try {
        const res = yield call(deleteUserCardApi, id);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(onSuccess) && onSuccess(res.data?.data);
            yield put(
              deleteUserCardSuccessAction({
                data: res.data?.data,
              }),
            );
          } else if (
            res.data.statusCode === ApiCode.FAILURE ||
            res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN
          ) {
            isFunction(payload.onError) && payload.onError(res.data.message);
          }
        } else {
          isFunction(payload.onError) && payload.onError(res.data.message);
        }
      } catch (error) {
        isFunction(onError) && onError('Internal server error');
      }
    },
  );
}

export default function* UserCardSaga() {
  yield all([
    fork(watchEditCard),
    fork(watchCreateCard),
    fork(watchDeleteCard),
  ]);
}
