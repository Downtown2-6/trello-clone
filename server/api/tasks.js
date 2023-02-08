const {
  models: { TaskCard, Comment, User },
} = require("../db");
const router = require("express").Router();

// GET /api/tasks/:boardId
router.get("/:boardId", async (req, res, next) => {
  try {
    const tasks = await TaskCard.findAll({
      where: {
        boardId: req.params.boardId,
      },
      order: [["position", "ASC"]],
      include: {
        model: Comment,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: [User]
      }
    });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/:boardId
router.post("/:boardId", async (req, res, next) => {
  try {
    await TaskCard.create(req.body);
    const taskCard = await TaskCard.findOne({
      where: {
        boardId: req.body.boardId,
        listId: req.body.listId,
        title: req.body.title,
        position: req.body.position
      },
      include: {
        model: Comment,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: [User]
      }
    });
    res.status(200).json(taskCard);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:boardId/:taskCardId
router.put('/:boardId/:taskCardId', async (req, res, next) => {
  try {
    const taskCard = await TaskCard.findByPk(req.params.taskCardId, {
      include: {
        model: Comment,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: [User]
      }
    });
    res.status(200).json(await taskCard.update(req.body));
  } catch (err) {
    next(err);
  }
});

// the above put request should suffice
// PUT /api/tasks/:taskId
// router.put("/:taskId", async (req, res, next) => {
//   try {
//     const { title, start, end } = req.body;
//     const task = await TaskCard.update(
//       { title, start, end },
//       { where: { id: req.params.taskId } }
//     );
//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
