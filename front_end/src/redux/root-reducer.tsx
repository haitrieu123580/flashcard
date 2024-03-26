
import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
import PasswordResetReducer from "@/redux/forgot-password/slice";
import PublicSetsReducer from "@/redux/public-sets/slice";
import NewestSetsReducer from "@/redux/newest-sets/slice";
const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
    PasswordReset: PasswordResetReducer,
    Sets: PublicSetsReducer,
    NewestSets: NewestSetsReducer,
};

export default rootReducer;