
import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
import PasswordResetReducer from "@/redux/forgot-password/slice";
import PublicSetsReducer from "@/redux/public-sets/slice";
import SetReducer from "@/redux/set/slice";
import CardReducer from "@/redux/card/slice";
import QuestionReducer from "@/redux/question/slice";
import UserSetsReducer from "@/redux/user-sets/slice";
import UserCardsReducer from "@/redux/user-cards/slice";
import UserProfileReducer from "@/redux/user-profile/slice";
import UserProgressReducer from "@/redux/user-progress/slice";
import UserTestReducer from "@/redux/user-tests/slice";
const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
    PasswordReset: PasswordResetReducer,
    Sets: PublicSetsReducer,
    Set: SetReducer,
    Card: CardReducer,
    Question: QuestionReducer,
    UserSets: UserSetsReducer,
    UserCards: UserCardsReducer,
    UserProfile: UserProfileReducer,
    UserProgress: UserProgressReducer,
    UserTest: UserTestReducer,
};

export default rootReducer;