const { Router } = require('express');

const router = Router();

// Used by Docker and Kubernetes to check that the app is alive.
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
