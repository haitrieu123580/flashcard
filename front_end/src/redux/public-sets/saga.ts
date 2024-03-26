import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/utils/Utils";
import {
  getAllSetsAction,
  getAllSetsSuccessAction
} from "./slice";
import {
  GetSetsApi
} from '@/api/SetsApi';

function* watchGetPublicSets() {
  yield takeLatest(getAllSetsAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { page_size, page_index, filter, name } = payload
    try {
      const res = yield call(GetSetsApi, { page_size, page_index, filter, name });
      if (res.status === HttpCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess();
          yield put(
            getAllSetsSuccessAction({
              data: res.data?.data?.sets
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



export default function* publicSetsSaga() {
  yield all([
    fork(watchGetPublicSets),
  ]);
}
