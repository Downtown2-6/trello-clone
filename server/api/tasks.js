const TaskCard = require('../db/models/TaskCard');

const router = require('express').Router();

// GET /api/tasks/:boardId
router.get('/:boardId', async (req, res, next) => {
  try{
    const tasks = await TaskCard.findAll({
      where: {
        boardId: req.params.boardId
      },
      order: [['position', 'ASC']],
    });
    res.status(200).json(tasks)
  }catch (err){
    next(err);
  }
});

// POST /api/tasks/:boardId
router.post('/:boardId', async (req, res, next) => {
  try {
    res.status(200).json(await TaskCard.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
