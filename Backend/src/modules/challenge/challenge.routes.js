const express = require('express');
const router = express.Router();
const challengeController = require('../../controllers/challenge.controller');

router.get('/:id', challengeController.getChallenge);

module.exports = router;
