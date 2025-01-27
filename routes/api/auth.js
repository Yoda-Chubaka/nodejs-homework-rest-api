import express from 'express';
import { validateBody } from '../../middlewares/validateBody.js';
import { loginSchema, patchSubscriptionSchema, registerSchema, verifyEmailSchema } from '../../models/user.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { getCurrent, login, logout, patchSubscription, register, updateAvatar, resendVerifyEmail, verifyEmail } from '../../controllers/auth.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { isEmptyBody } from '../../middlewares/isEmptyBody.js';
import { upload } from '../../middlewares/upload.js';

const router = express.Router();

router.post('/register', isEmptyBody, validateBody(registerSchema), cntrlTryCatchWrapper(register));
router.post('/login', isEmptyBody, validateBody(loginSchema), cntrlTryCatchWrapper(login));
router.get('/current', authenticate, cntrlTryCatchWrapper(getCurrent));
router.post('/logout', authenticate, cntrlTryCatchWrapper(logout));
router.patch('/', authenticate, isEmptyBody, validateBody(patchSubscriptionSchema), cntrlTryCatchWrapper(patchSubscription));
router.patch('/avatars', authenticate, upload.single('avatar'), cntrlTryCatchWrapper(updateAvatar));
router.get('/verify/:verificationToken', cntrlTryCatchWrapper(verifyEmail));
router.post('/verify', validateBody(verifyEmailSchema), cntrlTryCatchWrapper(resendVerifyEmail))

export default router;