const router = require('express').Router();
const { models: { Board, List } } = require('../db');

// GET /api/boards
router.get('/', async (req, res, next) => {
  try{
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch(err){
    next(err);
  }
});

// GET /api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: {
        model: List,
      }
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
});

// // matches POST requests to /api/kittens/
// router.post('/', function (req, res, next) { /* etc */});

// // matches PUT requests to /api/kittens/:kittenId
// router.put('/:kittenId', function (req, res, next) { /* etc */});

// // matches DELETE requests to /api/kittens/:kittenId
// router.delete('/:kittenId', function (req, res, next) { /* etc */});

module.exports = router;
