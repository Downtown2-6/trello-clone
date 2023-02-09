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

// DELETE /api/comments/comment/:commentId
router.delete("/comment/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await Comment.destroy({ where: { id: commentId } });
    res.status(201).json({ comment: Comment, message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
