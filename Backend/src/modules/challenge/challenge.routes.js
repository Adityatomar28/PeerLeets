// Challenge routes placeholder

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ message: 'get challenge route' });
});

module.exports = router;
