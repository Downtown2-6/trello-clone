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

// allBoards/:userId
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

module.exports = router;
