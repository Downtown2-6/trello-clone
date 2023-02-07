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
    const { userId } = req.params;
    const boards = await UserBoard.findAll({
      where: { userId },
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
    const { userId, boardId } = req.params;
    const boards = await UserBoard.findAll({
      where: { userId, boardId },
    });
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/changeUser/:userId
router.put("/changeUser/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(
      `***
    ***
    ***
    Logging:/changeUser/:userId, userId, Req.body
    ***
    ***
    ***
    `,
      userId,
      req.body
    );

    const getUser = await User.findOne({ where: { id: userId } });
    console.log(
      `***
    ***
    ***
    Logging:this is the User
    ***
    ***
    ***
    `,
      getUser.dataValues
    );

    const putUser = await getUser.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    // const putUser = await getUser.update({
    //   firstName: getUser.dataValues.firstName,
    //   lastName: getUser.dataValues.lastName,
    //   email: getUser.dataValues.email,
    //   password: getUser.dataValues.password,
    // });

    res.status(200).json(putUser);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/grantAccess/:boardId
// This creates a user/board association
// Generally want to user /grantAccess/boards/:boardId
// The above is to avoid route conflicts
router.post("/grantAccess/:boardId", async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { userEmail: email } = req.body;
    console.log(
      `***
    ***
    ***
    Logging:inside the API
    ***
    ***
    ***
    `,
      boardId,
      email
    );
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      res.status(404).json({ message: "User Not found" });
    }
    const privilege = "USER";
    const userId = findUser.id;
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

// PUT /api/users/modifyPrivilege/:userIssuingRequestId/:boardId/:userId
router.put(
  "/modifyPrivilege/:userIssuingRequestId/:boardId",
  async (req, res, next) => {
    try {
      const { userIssuingRequestId: issuer, boardId } = req.params;
      const theIssuer = await UserBoard.findOne({
        where: { boardId, userId: issuer },
      });
      console.log("Is the issuer an ADMIN?", theIssuer.privilege === "ADMIN");
      if (theIssuer.privilege != "ADMIN") {
        return res
          .status(401)
          .json({ message: "You need to be an admin to do this." });
      }
      const { privilege, email } = req.body;
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        return res
          .status(404)
          .json({ message: "This email isn't registered to a user." });
      }
      const userId = findUser.id;
      const userBoard = await UserBoard.findOne({ where: { boardId, userId } });
      if (!userBoard) {
        return res.status(404).json({ message: "User not found in the board" });
      }
      await userBoard.update({ privilege });
      res.status(200).json({ message: "User privilege updated successfully" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
