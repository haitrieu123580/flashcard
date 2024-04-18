
import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
import PasswordResetReducer from "@/redux/forgot-password/slice";
import PublicSetsReducer from "@/redux/public-sets/slice";
import SetReducer from "@/redux/set/slice";
import CardReducer from "@/redux/card/slice";
import QuestionReducer from "@/redux/question/slice";

const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
    PasswordReset: PasswordResetReducer,
    Sets: PublicSetsReducer,
    Set: SetReducer,
    Card: CardReducer,
    Question: QuestionReducer,
};

export default rootReducer;