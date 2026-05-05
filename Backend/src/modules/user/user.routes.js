// User routes placeholder

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ message: 'get user route' });
});

module.exports = router;
