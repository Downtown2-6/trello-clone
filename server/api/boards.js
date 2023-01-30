const router = require("express").Router();

const Board = require("../db/models/Board");
const UserBoard = require("../db/models/UserBoard");
const List = require("../db/models/List");
const TaskCard = require("../db/models/TaskCard");


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


// GET /api/boards/:userId/:boardId
router.get('/:userId/:boardId', async (req, res, next) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: [
        {model: List, include: [TaskCard]}
      ]
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
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

    const userBoard = await UserBoard.create({
      userId: req.body.loggedInUserId,
      boardId: newBoard.id,
      privilege: "ADMIN",
    });
    res.status(201).send(newBoard);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
