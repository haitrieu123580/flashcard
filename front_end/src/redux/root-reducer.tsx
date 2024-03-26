
import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
    PasswordReset: PasswordResetReducer,
    Sets: PublicSetsReducer,
    NewestSets: NewestSetsReducer,
};

export default rootReducer;