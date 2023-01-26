const router = require('express').Router();
const Board = require('../db/models/Board')
const userBoards = require('../db/models/UserBoard')

// matches GET requests to /api/kittens/
router.get('/', async (req, res, next) => {
  try{
    console.log('***** Boards backend route hit *****')
    const boards = await Board.findAll()
    res.status(200).json(boards)
  } catch(err){
    next(err)
  }
});

router.get('/user', async (req, res, next) => {
  try {
    console.log("This is inside of the api route for boards/user")
    const theUserId = 1
    const boards = await userBoards.findAll({
      where: {userId : theUserId},
      include: { model: Board },
    });
    res.json(boards);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("This is post to Board", req.body)
    res.status(201).send(await Board.create(req.body));
  } catch (error) {
    next(error);
  }
});



// // matches POST requests to /api/kittens/
// router.post('/', function (req, res, next) { /* etc */});

// // matches PUT requests to /api/kittens/:kittenId
// router.put('/:kittenId', function (req, res, next) { /* etc */});

// // matches DELETE requests to /api/kittens/:kittenId
// router.delete('/:kittenId', function (req, res, next) { /* etc */});

module.exports = router;
