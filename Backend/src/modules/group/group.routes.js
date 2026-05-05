// Group routes placeholder

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ message: 'get group route' });
});

module.exports = router;
