const router = require('express').Router();
const { models: { List, TaskCard }} = require('../db');

// GET /api/lists/:boardId
router.get('/:boardId', async (req, res, next) => {
  try{
    const lists = await List.findAll({
      where: {
        boardId: req.params.boardId
      },
      order: [['position', 'ASC']],
      include: {
        model: TaskCard,
        separate: true,
        order: [['position', 'ASC']]
      }
    });
    res.status(200).json(lists);
  }catch (err){
    next(err);
  }
});

// POST /api/lists/:boardId
router.post('/:boardId', async (req, res, next) => {
  try {
    res.status(200).json(await List.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;