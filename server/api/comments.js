const router = require("express").Router();
const { models: { Comment, TaskCard, User }} = require('../db');

// POST /api/comments
router.post('/', async (req, res, next) => {
  try {
    await Comment.create(req.body);
    const taskCard = await TaskCard.findByPk(req.body.taskcardId, {
      include: {
        model: Comment,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: [User]
      }
    });
    res.status(200).json(taskCard);
  } catch (error) {
    next(error);
  };
});

module.exports = router;