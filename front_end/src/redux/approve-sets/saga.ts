import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/lib/utils";
import {
  getPendingSetsListAction,
  getPendingSetsListErrorAction,
  getPendingSetsListSuccessAction,

  getSetByAdminAction,
  getSetByAdminErrorAction,
  getSetByAdminSuccessAction,

  approveSetAction,
  approveSetErrorAction,
  approveSetSuccessAction,

  rejectSetAction,
  rejectSetErrorAction,
  rejectSetSuccessAction,

} from "./slice";
import {
  getPendingSetsListApi,
  approveSetApi,
  rejectSetApi,
  getSetByAdminApi,
} from '@/api/ApproveSetApi';

function* watchGetPendingSetsList() {
  yield takeLatest(getPendingSetsListAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { page_size, page_index, filter, name } = payload
    try {
      const res = yield call(getPendingSetsListApi);

      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload?.onSuccess) && payload.onSuccess();
          yield put(
            getPendingSetsListSuccessAction({
              data: res.data?.data?.sets,
              pagination: {
                total: res.data?.data?.count
              }
            })
          );
        }
      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload.onError(error?.response?.data?.message || "Error");
      yield put(
        {
          type: getPendingSetsListErrorAction.type,
        }
      )
    }
  });
}
function* watchGetSetByAdmin() {
  yield takeLatest(getSetByAdminAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id } = payload
    try {
      const res = yield call(getSetByAdminApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            getSetByAdminSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(getSetByAdminErrorAction())
    }
  });
}

function* watchApproveSet() {
  yield takeLatest(approveSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, level } = payload
    try {
      const res = yield call(approveSetApi, { setId: id, level });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            approveSetSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(approveSetErrorAction())
    }
  });
}

function* watchRejectSet() {
  yield takeLatest(rejectSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id, level } = payload
    try {
      const res = yield call(rejectSetApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            rejectSetSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
      }

    } catch (error: any) {
      isFunction(payload?.onError) && payload?.onError(error?.response?.data?.message);
      yield put(rejectSetErrorAction())
    }
  });
}

export default function* SetSaga() {
  yield all([
    fork(watchGetPendingSetsList),
    fork(watchGetSetByAdmin),
    fork(watchApproveSet),
    fork(watchRejectSet),
  ]);
}
