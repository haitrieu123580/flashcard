import {Router} from "express"
const router = Router();
import isValidKey from "@src/middleware/VerifyApiKey";
import authRoutes from "@routers/auth/index"
import userRouter from '@routers/user/index';
import passportRouter from '@routers/passport/index';
import vocabRouter from '@routers/vocabulary-set/index';
import cardRouter from '@routers/card/index';
import userSetsRouter from '@routers/user-sets/index';
import userCardsRouter from '@routers/user-cards/index';
import testRouter from "@routers/test-sets/index";
import userTestRouter from "@routers/user-tests/index";
import userProgressRouter from "@routers/user-progress/index";
import adminAprroveUserSetRouter from "@routers/approve-sets/index";
import testKitRouter from '@routers/test-kit/index';

router.use(isValidKey);
router.use("/auth", authRoutes);
router.use('/passport', passportRouter)
router.use('/auth', authRoutes)
router.use('/user', userRouter)
router.use('/vocabulary-set', vocabRouter)
router.use('/card', cardRouter)
router.use('/user-sets', userSetsRouter)
router.use('/user-cards', userCardsRouter)
router.use('/tests', testRouter)
router.use('/user-tests', userTestRouter)
router.use('/user-progress', userProgressRouter)
router.use('/admin/approve-set', adminAprroveUserSetRouter)
router.use('/test-kit', testKitRouter)

export default router;