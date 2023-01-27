"use strict";

const {
  db,
  models: { User, Board, List, TaskCard, UserTaskCard, UserBoard },
} = require("./server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ firstName: 'Cody', lastName: 'Code', email: "cody@gmail.com", password: "123" }),
    User.create({ firstName: 'Murphy', lastName: 'Murph', email: "murphy@gmail.com", password: "123" }),
  ]);

  // Creating Board
  const boards = await Promise.all([
    Board.create({ boardName: "This Board", creatorId: 1 }),
    Board.create({ boardName: "That Board", creatorId: 2 }),
  ]);

  // Creating List
  const list = await Promise.all([
    List.create({ id: 1, listName: "To Do", position: 1, boardId: 1 }),
    List.create({ id: 2, listName: "In Progress", position: 2, boardId: 1 }),
    List.create({ id: 3, listName: "Code Review", position: 3, boardId: 1 }),
    List.create({ id: 4, listName: "Complete", position: 4, boardId: 1 }),
    List.create({ id: 5, listName: "To Do", position: 1, boardId: 2 }),
    List.create({ id: 6, listName: "In Progress", position: 2, boardId: 2 }),
    List.create({ id: 7, listName: "Code Review", position: 3, boardId: 2 }),
    List.create({ id: 8, listName: "Complete", position: 4, boardId: 2 }),
  ]);

  // Creating TaskCard
  const taskcard = await Promise.all([
    TaskCard.create({ id: 1, taskcardName: "Navbar", position: 1, listId: 2, boardId: 1 }),
    TaskCard.create({ id: 2, taskcardName: "Express Routes", position: 1, listId: 3, boardId: 1 }),
    TaskCard.create({ id: 3, taskcardName: "Board Feature", position: 2, listId: 2, boardId: 1 }),
    TaskCard.create({ id: 4, taskcardName: "List Feature", position: 3, listId: 2, boardId: 1 }),
    TaskCard.create({ id: 5, taskcardName: "TaskCard Feature", position: 1, listId: 1, boardId: 1 }),
    TaskCard.create({ id: 6, taskcardName: "Task Feature", position: 2, listId: 1, boardId: 1 }),
  ]);

  // Creating UserTaskCard
  const userTaskCard = await Promise.all([
    UserTaskCard.create({ userId: 1, taskcardId: 1 }),
    UserTaskCard.create({ userId: 1, taskcardId: 2 }),
    UserTaskCard.create({ userId: 2, taskcardId: 3 }),
    UserTaskCard.create({ userId: 2, taskcardId: 4 }),
  ]);

  // Creating UserBoard
  // privilege on UserBoard future proofs to add functionality, because user can be added to the board to only add privilege of certain types of things.
  const userBoard = await Promise.all([
    UserBoard.create({ userId: 1, boardId: 1, privilege: "ADMIN" }),
    UserBoard.create({ userId: 2, boardId: 2, privilege: "ADMIN" }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
