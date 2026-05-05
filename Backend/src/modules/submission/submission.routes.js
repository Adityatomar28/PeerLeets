// Submission routes placeholder

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'submission route' });
});

module.exports = router;
