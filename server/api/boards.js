const router = require('express').Router();
const { models: { Board, List } } = require('../db');
const TaskCard = require('../db/models/TaskCard');

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
      include: {
        model: List,
      }
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
});

// GET /api/boards/:userId/:boardId/:listId
router.get('/:userId/:boardId/:listId', async (req, res, next) => {
  try{
    console.log('88888 LIST/TASK ROUTE HIT 88888')
    const list = await List.findByPk(req.params.listId, {
      include: {
        model: TaskCard
      }
    })
    console.log(list)
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
