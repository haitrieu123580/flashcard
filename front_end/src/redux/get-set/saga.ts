import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/utils/Utils";
import {
  getSetByIdAction,
  getSetByIdSuccessAction
} from "./slice";
import {
  GetSetByIdApi
} from '@/api/SetsApi';

function* watchGetSetById() {
  yield takeLatest(getSetByIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id } = payload
    // console.log(object)
    try {
      const res = yield call(GetSetByIdApi, id);
      console.log('res', res)
      if (res.status === HttpCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess();
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



export default function* SetSaga() {
  yield all([
    fork(watchGetSetById),
  ]);
}
