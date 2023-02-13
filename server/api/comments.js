const router = require("express").Router();
const {
  models: { Comment, TaskCard, User },
} = require("../db");

// POST /api/comments
router.post("/", async (req, res, next) => {
  try {
    await Comment.create(req.body);
    const taskCard = await TaskCard.findByPk(req.body.taskcardId, {
      include: {
        model: Comment,
        separate: true,
        order: [["createdAt", "DESC"]],
        include: [User],
      },
    });
    res.status(200).json(taskCard);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/comments/:commentId
router.delete("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const theCommentBeingDestroyed = await Comment.findOne({where:{id:commentId}})
    if (!theCommentBeingDestroyed) {
      res.status(404).json("Comment not found!");
    } else {
      await theCommentBeingDestroyed.destroy();
      const taskCard = await TaskCard.findByPk(theCommentBeingDestroyed.taskcardId, {
        include: {
          model: Comment,
          separate: true,
          order: [["createdAt", "DESC"]],
          include: [User],
        },
      }); 
      res.status(201).json({theCommentBeingDestroyed, taskCard});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
