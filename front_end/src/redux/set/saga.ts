import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/lib/utils";
import {
  getSetByIdAction,
  getSetByIdSuccessAction,
  createSetAction,
  createSetSuccessAction,
  editSetAction,
  editSetSuccessAction,
  deleteSetAction,
  deleteSetSuccessAction,

} from "./slice";
import {
  GetSetByIdApi,
  CreateSetApi,
  EditSetApi,
  DeleteSetApi,
} from '@/api/SetsApi';

function* watchGetSetById() {
  yield takeLatest(getSetByIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id } = payload
    try {
      const res = yield call(GetSetByIdApi, id);
      if (res.status === ErrorCode.OK) {
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
      if (res.status === ErrorCode.OK) {
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
      if (res.status === ErrorCode.OK) {
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

function* watchDeleteSet() {
  yield takeLatest(deleteSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, onError, onSuccess } = payload
    try {
      const res = yield call(DeleteSetApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(onSuccess) && onSuccess(res.data?.data);
          yield put(
            deleteSetSuccessAction
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

export default function* SetSaga() {
  yield all([
    fork(watchGetSetById),
    fork(watchCreateSet),
    fork(watchEditSet),
    fork(watchDeleteSet),
  ]);
}
