import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
// import {

// } from "./slice";
import { isFunction } from "@/utils/Utils";

function* watchGetPublicSets() {
  // yield takeLatest(Action.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
  //   try {
  //     const res = yield call(dApi, payload.data);
  //     if (res.status === HttpCode.OK) {
  //       if (res.data.statusCode === ApiCode.SUCCESS) {
  //         isFunction(payload.onSuccess) && payload.onSuccess();
  //         yield put(
  //           ActionSuccess({
  //             data: payload.data,
  //           })
  //         );
  //       }
  //       else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
  //         isFunction(payload.onError) && payload.onError(res.data.message);
  //       }
  //     }

  //   } catch (error) {

  //   }
  // });
}



export default function* publicSetsSaga() {
  yield all([
    fork(watchGetPublicSets),
  ]);
}
