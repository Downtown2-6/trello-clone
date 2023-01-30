const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/boards', require('./boards'));
router.use('/tasks', require('./tasks'));

// 404 error handling
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
