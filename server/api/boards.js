const router = require('express').Router();
const { models: { Board, List, TaskCard } } = require('../db');


// GET /api/boards
router.get('/', async (req, res, next) => {
  try{
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch(err){
    next(err);
  }
});

// GET /api/boards/:userId/:boardId
router.get('/:userId/:boardId', async (req, res, next) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: [
        {model: List, include: [TaskCard]}
      ]
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
