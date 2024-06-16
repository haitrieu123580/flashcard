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
  AddCardToNewSetApi,
  AddCardToSetApi,
  CreateUserSetApi,
  DeleteUserSetApi,
  EditUserSetApi,
  GetUserSetByIdApi,
  GetUSerSetsListApi,
  RequestToApproveSetApi,
} from '@/api/UserSetsApi';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import {
  addCardToMySetAction,
  addCardToMySetFailureAction,
  addCardToMySetSuccessAction,
  createUserSetAction,
  createUserSetSuccessAction,
  deleteUserSetAction,
  deleteUserSetFailureAction,
  deleteUserSetSuccessAction,
  editUserSetAction,
  editUserSetFailureAction,
  editUserSetSuccessAction,
  getUserSetByIdAction,
  getUserSetByIdFailureAction,
  getUserSetByIdSuccessAction,
  getUserSetsListAction,
  getUserSetsListFailureAction,
  getUserSetsListSuccessAction,
  quickAddNewSetAction,
  quickAddNewSetFailureAction,
  quickAddNewSetSuccessAction,
  requestToApproveSetAction,
  requestToApproveSetFailureAction,
  requestToApproveSetSuccessAction,
} from './slice';

function* watchUserSetsList() {
  yield takeLatest(
    getUserSetsListAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      try {
        const res = yield call(GetUSerSetsListApi);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload?.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              getUserSetsListSuccessAction({
                data: res.data?.data,
                pagination: {
                  total: res.data?.data?.count,
                }
              }));
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload?.onError(error?.response?.data?.message);
        yield put(getUserSetsListFailureAction());
      }
    },
  );
}

function* watchAddCardToMySet() {
  yield takeLatest(
    addCardToMySetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data } = payload;
      try {
        const res = yield call(AddCardToSetApi, {
          setId: data?.setId,
          cardId: data?.cardId,
        });
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload?.onSuccess) &&
              payload?.onSuccess(res.data?.data);
            yield put(
              addCardToMySetSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload?.onError(error?.response?.data?.message);
        yield put(addCardToMySetFailureAction());
      }
    },
  );
}

function* watchGetUserSetById() {
  yield takeLatest(
    getUserSetByIdAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { id } = payload;
      try {
        const res = yield call(GetUserSetByIdApi, id);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload?.onSuccess) &&
              payload?.onSuccess(res.data?.data);
            yield put(
              getUserSetByIdSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload.onError(error?.response?.data?.message);
        yield put(getUserSetByIdFailureAction());
      }
    },
  );
}

function* watchCreateUserSet() {
  yield takeLatest(
    createUserSetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data } = payload;
      try {
        const res = yield call(CreateUserSetApi, data);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              createUserSetSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload.onError(error?.response?.data?.message);
        yield put(getUserSetByIdFailureAction());
      }
    },
  );
}
function* watchEditSet() {
  yield takeLatest(
    editUserSetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data, id } = payload;
      try {
        const res = yield call(EditUserSetApi, { id, data });
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            yield put(
              editUserSetSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload?.onError(error?.response?.data?.message);
        yield put(editUserSetFailureAction());
      }
    },
  );
}

function* watchDeleteSet() {
  yield takeLatest(
    deleteUserSetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { id, onError, onSuccess } = payload;
      try {
        const res = yield call(DeleteUserSetApi, id);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(onSuccess) && onSuccess(res.data?.data);
            yield put(
              deleteUserSetSuccessAction({
                data: res.data?.data,
              }),
            );
          } else if (
            res.data.statusCode === ApiCode.FAILURE ||
            res.data.statusCode === ApiCode.INVALID_ACCESS_TOKEN
          ) {
            isFunction(payload?.onError) && payload?.onError(res.data.message);
          }
        } else {
          isFunction(payload?.onError) && payload?.onError(res.data.message);
        }
      } catch (error) {
        isFunction(onError) && onError('Internal server error');
      }
    },
  );
}

function* watchQuickAddCardToNewSet() {
  yield takeLatest(
    quickAddNewSetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { data } = payload;
      try {
        const res = yield call(AddCardToNewSetApi, {
          set_name: data?.set_name,
          cardId: data?.cardId,
        });
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload?.onSuccess) &&
              payload?.onSuccess(res.data?.data);
            yield put(
              quickAddNewSetSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload?.onError(error?.response?.data?.message);
        yield put(quickAddNewSetFailureAction());
      }
    },
  );
}

function* watchRequestToApproveSet() {
  yield takeLatest(
    requestToApproveSetAction.type,
    function* ({ payload }: PayloadAction<any>): Generator<any, void, any> {
      const { setId } = payload;
      try {
        const res = yield call(RequestToApproveSetApi, setId);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            isFunction(payload?.onSuccess) &&
              payload?.onSuccess(res.data?.data);
            yield put(
              requestToApproveSetSuccessAction({
                data: res.data?.data,
              }),
            );
          }
        }
      } catch (error: any) {
        isFunction(payload?.onError) &&
          payload?.onError(error?.response?.data?.message);
        yield put(requestToApproveSetFailureAction());
      }
    },
  );
}

export default function* UserSetsSaga() {
  yield all([
    fork(watchUserSetsList),
    fork(watchAddCardToMySet),
    fork(watchGetUserSetById),
    fork(watchCreateUserSet),
    fork(watchEditSet),
    fork(watchDeleteSet),
    fork(watchQuickAddCardToNewSet),
    fork(watchRequestToApproveSet),
  ]);
}
