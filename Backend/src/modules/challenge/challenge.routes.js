import express from 'express';
import * as challengeController from '../../controllers/challenge.controller.js';

const router = express.Router();

router.get('/:id', challengeController.getChallenge);

export default router;
