const TaskCard = require('../db/models/TaskCard');

const router = require('express').Router();

// GET /api/tasks/:listId
router.get('/:listId', async (req, res, next) => {
  try{
    const tasks = await TaskCard.findAll({
      where: {
        listId: req.params.listId
      },
      order: [['position', 'ASC']],
    });
    res.status(200).json(tasks)
  }catch (err){
    next(err);
  }
});

// POST /api/tasks/:listId
router.post('/:listId', async (req, res, next) => {
  try {
    res.status(200).json(await TaskCard.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
