import express from 'express';
import * as groupController from '../../controllers/group.controller.js';

const router = express.Router();

router.get('/:id', groupController.getGroup);

export default router;
