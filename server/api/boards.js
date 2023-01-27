const router = require("express").Router();
const Board = require("../db/models/Board");
const userBoards = require("../db/models/UserBoard");

// matches GET requests to /api/kittens/
router.get("/", async (req, res, next) => {
  try {
    console.log("***** Boards backend route hit *****");
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    console.log("This is inside of the api route for boards/user");
    const theUserId = 1;
    const boards = await userBoards.findAll({
      where: { userId: theUserId },
      include: { model: Board },
    });
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

// --------------------------
//#region This works
// --------------------------
router.post("/", async (req, res, next) => {
  try {
    console.log(`The\npost\nthing\nis\nhere\n HAHA`, req.body);
    const newBoard = await Board.create({
      boardName: req.body.boardName,
      creatorId: req.body.loggedInUserId,
    });

    res.status(201).send(newBoard);
  } catch (error) {
    next(error);
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

module.exports = router;
