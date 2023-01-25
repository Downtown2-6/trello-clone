const TaskCard = require('../db/models/TaskCard');

const router = require('express').Router();

// matches GET requests to /api/tasks/
router.get('/', async (req, res, next) => {
  try{
    console.log('***** tasks backend route hit *****')
    const tasks = await TaskCard.findAll()
    res.status(200).json(tasks)
  }catch (err){
    next(err)
  }
});

// // matches POST requests to /api/puppies/
// router.post('/', function (req, res, next) { /* etc */});

// // matches PUT requests to /api/puppies/:puppyId
// router.put('/:puppyId', function (req, res, next) { /* etc */});

// // matches DELETE requests to /api/puppies/:puppyId
// router.delete('/:puppyId', function (req, res, next) { /* etc */});

module.exports = router;
