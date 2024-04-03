import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/utils/Utils";
import {
  getSetByIdAction,
  getSetByIdSuccessAction,
  createSetAction,
  createSetSuccessAction,
  editSetAction,
  editSetSuccessAction,

} from "./slice";
import {
  GetSetByIdApi,
  CreateSetApi,
  EditSetApi,
} from '@/api/SetsApi';

function* watchGetSetById() {
  yield takeLatest(getSetByIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id } = payload
    try {
      const res = yield call(GetSetByIdApi, id);
      if (res.status === HttpCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            getSetByIdSuccessAction
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

    }
  });
}

function* watchCreateSet() {
  yield takeLatest(createSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data } = payload
    try {
      const res = yield call(CreateSetApi, data);
      if (res.status === HttpCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            createSetSuccessAction
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

    }
  });
}

function* watchEditSet() {
  yield takeLatest(editSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data, id } = payload
    try {
      const res = yield call(EditSetApi, { id, data });
      if (res.status === HttpCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            editSetSuccessAction
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

    }
  });
}


export default function* SetSaga() {
  yield all([
    fork(watchGetSetById),
    fork(watchCreateSet),
    fork(watchEditSet),
  ]);
}
