import { Router } from 'express';
import { getUserProfileHandler, updateUserProfileHandler } from './userController.js';
const router = Router();

router.get('/:id', getUserProfileHandler);
router.put('/:id', updateUserProfileHandler);

export default router;