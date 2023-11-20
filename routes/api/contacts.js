import express from 'express';
import { deleteContact, getAll, getById, updateStatusContact, postContact, putContact } from '../../controllers/contacts.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { addSchema, patchSchema, putSchema } from '../../models/contact.js';

const router = express.Router();

router.get('/', authenticate, cntrlTryCatchWrapper(getAll));
router.get('/:contactId', authenticate, isValidId, cntrlTryCatchWrapper(getById));
router.post('/', authenticate, validateBody(addSchema), cntrlTryCatchWrapper(postContact));
router.delete('/:contactId', authenticate, isValidId, cntrlTryCatchWrapper(deleteContact));
router.put('/:contactId', authenticate, isValidId, validateBody(putSchema), cntrlTryCatchWrapper(putContact));
router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(patchSchema), cntrlTryCatchWrapper(updateStatusContact))

export default router;