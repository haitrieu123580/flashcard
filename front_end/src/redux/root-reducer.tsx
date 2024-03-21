
import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
import PasswordResetSlice from "@/redux/forgot-password/slice";
const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
    PasswordReset: PasswordResetSlice,
};

export default rootReducer;