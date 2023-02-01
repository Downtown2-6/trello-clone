const router = require("express").Router();
const {
  models: { User, Board },
} = require("../db");
const UserBoard = require("../db/models/UserBoard");

// matches GET requests to /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though users' passwords are encrypted
      // it won't help if we just send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/allBoards/:userId
router.get("/allBoards/:userId", async (req, res, next) => {
  try {
    console.log(
      "This\n--is\n--inside\n--of\n--the\n--api\n--route\n--for\n--boards/user",
      req.params.userId
    );
    const theUserId = req.params.userId;
    const boards = await UserBoard.findAll({
      where: { userId: theUserId },
      include: { model: Board },
    });
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/specificBoard/:userId/:boardId
router.get("/specificBoard/:userId/:boardId", async (req, res, next) => {
  try {
    console.log(
      "This\n--is\n--inside\n--of\n--the\n--api\n--route\n--for\n--boards/user",
      req.params.userId
    );
    const theUserId = req.params.userId;
    const boardId = req.params.boardId;
    const boards = await UserBoard.findAll({
      where: { userId: theUserId, boardId: boardId },
    });
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/grantAccess/:boardId/:userId
router.put("/grantAccess/:boardId/:userId", async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    const privilege = "USER";
    const boards = await UserBoard.findAll({
      where: { userId: userId, boardId: boardId },
    });

    if (!boards.length) {
      const userBoard = await UserBoard.create({ boardId, userId, privilege });
      res.status(201).json({ message: "User added to board successfully" });
      res.status(200).json(boards);
    } else {
      res
        .status(400)
        .json(
          "User already in this board, you idiot — you bumbling buffoon — you peerless poopyhead."
        );
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/modifyPrivilege/:boardId/:userId
router.put("/modifyPrivilege/:boardId/:userId", async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    const { privilege } = req.body;
    const userBoard = await UserBoard.findOne({ where: { boardId, userId } });
    if (!userBoard) {
      return res.status(404).json({ message: "User not found in the board" });
    }
    await userBoard.update({ privilege });
    res.status(200).json({ message: "User privilege updated successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
