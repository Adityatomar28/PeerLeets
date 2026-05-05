// Leaderboard routes placeholder

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'leaderboard route' });
});

module.exports = router;
