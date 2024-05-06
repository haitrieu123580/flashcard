import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import ApiCode from "@/lib/enums/ApiCode";
import { ErrorCode } from "@/lib/enums/ErrorCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { isFunction } from "@/lib/utils";
import {
  getUserSetsListAction,
  getUserSetsListSuccessAction,
  getUserSetsListFailureAction,
  addCardToMySetAction,
  addCardToMySetSuccessAction,
  addCardToMySetFailureAction,
  getUserSetByIdAction,
  getUserSetByIdSuccessAction,
  getUserSetByIdFailureAction,
  createUserSetAction,
  createUserSetSuccessAction,

} from "./slice";
import {
  GetUSerSetsListApi,
  AddCardToSetApi,
  GetUserSetByIdApi,
  CreateUserSetApi,
  DeleteSetApi,
} from '@/api/UserSetsApi';

function* watchUserSetsList() {
  yield takeLatest(getUserSetsListAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    try {
      const res = yield call(GetUSerSetsListApi);

      console.log("res: ", res?.data.data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          // isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            getUserSetsListSuccessAction(
              { data: res.data?.data }
            )
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          // isFunction(payload.onError) && payload.onError(res.data.message);
        }
      }

    } catch (error) {

    }
  });
}

function* watchAddCardToMySet() {
  yield takeLatest(addCardToMySetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data } = payload
    console.log("data: ", data);
    try {
      const res = yield call(AddCardToSetApi, {
        setId: data?.setId,
        cardId: data?.cardId
      });
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload?.onSuccess) && payload?.onSuccess(res.data?.data);
          yield put(
            addCardToMySetSuccessAction
              ({
                data: res.data?.data
              })
          );
        }
        else if (res.data.statusCode === ApiCode.FAILURE || res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN) {
          isFunction(payload?.onError) && payload?.onError(res.data.message);
        }
      }

    } catch (error) {

    }
  });
}

function* watchGetUserSetById() {
  yield takeLatest(getUserSetByIdAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { id } = payload
    try {
      const res = yield call(GetUserSetByIdApi, id);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            getUserSetByIdSuccessAction
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

function* watchCreateUserSet() {
  yield takeLatest(createUserSetAction.type, function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
    const { data } = payload
    try {
      const res = yield call(CreateUserSetApi, data);
      if (res.status === ErrorCode.OK) {
        if (res.data.statusCode === ApiCode.SUCCESS) {
          isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
          yield put(
            createUserSetSuccessAction
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

export default function* UserSetsSaga() {
  yield all([
    fork(watchUserSetsList),
    fork(watchAddCardToMySet),
    fork(watchGetUserSetById),
    fork(watchCreateUserSet),
  ]);
}
