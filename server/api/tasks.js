const TaskCard = require('../db/models/TaskCard');

const router = require('express').Router();

// GET /api/tasks/:listId
router.get('/:listId', async (req, res, next) => {
  try{
    console.log('***** tasks backend route hit *****');
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

module.exports = router;
