const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/tasks', require('./tasks')); // matches all requests to  /api/puppies/
router.use('/events', require('./events')); // matches all requests to  /api/puppies/
router.use('/boards', require('./boards')); // matches all requests to  /api/kittens/

// 404 error handling
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
