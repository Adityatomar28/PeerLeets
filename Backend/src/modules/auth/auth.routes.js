// Auth routes placeholder

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'auth login route' });
});

module.exports = router;
