const express = require('express');
const router = express.Router();
const groupController = require('../../controllers/group.controller');

router.get('/:id', groupController.getGroup);

module.exports = router;
