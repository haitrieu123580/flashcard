import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { EditProfileApi } from '@/api/UserProfile';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import {
  editUserAction,
  editUserErrorAction,
  editUserSuccessAction,
} from './slice';

function* watchEditProfile() {
  yield takeLatest(
    editUserAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, onError, onSuccess } = payload;
      try {
        const res = yield call(EditProfileApi, data);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              editUserSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(onError) &&
          onError(error?.response?.data?.message || 'Error');
        yield put(editUserErrorAction());
      }
    },
  );
}

export default function* UserProfileSaga() {
  yield all([fork(watchEditProfile)]);
}
