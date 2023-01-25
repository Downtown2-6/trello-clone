const router = require('express').Router();
const Board = require('../db/models/Board')

// matches GET requests to /api/kittens/
router.get('/', async (req, res, next) => {
  try{
    console.log('***** Boards backend route hit *****')
    const boards = await Board.findAll()
    res.status(200).json(boards)
  } catch(err){
    next(err)
  }
});

// // matches POST requests to /api/kittens/
// router.post('/', function (req, res, next) { /* etc */});

// // matches PUT requests to /api/kittens/:kittenId
// router.put('/:kittenId', function (req, res, next) { /* etc */});

// // matches DELETE requests to /api/kittens/:kittenId
// router.delete('/:kittenId', function (req, res, next) { /* etc */});

module.exports = router;
