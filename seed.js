"use strict";

const {
  db,
  models: { User, Board, List, Event, Taskcard, UserTaskcard, UserBoard },
} = require("./server/db");
const EventInvite = require("./server/db/models/EventInvite");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  console.log(`\nHere\n\nis\nthe\nbeforeSync`);
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  console.log(`\nHere\n\nis\nthe\n AFTER \n SYNC\n`);

  // Creating Users
  const users = await Promise.all([
    User.create({ email: "cody@gmail.com", password: "123" }),
    User.create({ email: "murphy@gmail.com", password: "123" }),
  ]);

  // Creating Board
  const boards = await Promise.all([
    Board.create({ boardName: "This Board", creatorId: 1 }),
    Board.create({ boardName: "That Board", creatorId: 2 }),
  ]);

  // Creating List
  const list = await Promise.all([
    List.create({ listName: "This List", position: 1 }),
    List.create({ listName: "That List", position: 2 }),
  ]);

  // Creating Taskcard
  const taskcard = await Promise.all([
    Taskcard.create({ taskcardName: "First Task", position: 1 }),
    Taskcard.create({ taskcardName: "Second Task", position: 2 }),
    Taskcard.create({ taskcardName: "Third Task", position: 3 }),
    Taskcard.create({ taskcardName: "Fourth Task", position: 4 }),
  ]);

  // Creating UserTaskcard
  const userTaskcard = await Promise.all([
    UserTaskcard.create({ userId: 1, taskcardId: 1 }),
    UserTaskcard.create({ userId: 1, taskcardId: 2 }),
    UserTaskcard.create({ userId: 2, taskcardId: 3 }),
    UserTaskcard.create({ userId: 2, taskcardId: 4 }),
  ]);

  // Creating UserBoard
  // privilege on UserBoard future proofs to add functionality, because user can be added to the board to only add privilege of certain types of things.
  const userBoard = await Promise.all([
    UserBoard.create({ userId: 1, boardId: 1, privilege: "ADMIN" }),
    UserBoard.create({ userId: 2, boardId: 2, privilege: "ADMIN" }),
    UserBoard.create({ userId: 2, boardId: 1, privilege: "USER" }),
    UserBoard.create({ userId: 1, boardId: 2, privilege: "USER" }),
  ]);

  // Creating Event
  console.log(`creating events`);
  const events = await Promise.all([
    Event.create({
      title: "Meeting with team",
      startTime: "2022-03-01T10:00:00",
      endTime: "2022-03-01T12:00:00",
      userId: 1,
      description: "No",
    }),
    Event.create({
      title: "Project deadline",
      startTime: "2022-03-15T09:00:00",
      endTime: "2022-03-15T17:00:00",
      userId: 1,
      description: "No",
    }),
    Event.create({
      title: "Client call",
      startTime: "2022-03-10T14:00:00",
      endTime: "2022-03-10T15:00:00",
      userId: 2,
      description: "No",
    }),
    Event.create({
      title: "Team lunch",
      startTime: "2022-03-20T12:00:00",
      endTime: "2022-03-20T13:00:00",
      userId: 2,
      description: "No",
    }),
  ]);

  // Creating EventInvite
  const eventinvite = Promise.all([
    EventInvite.create({ eventId: 1, userId: 2, status: "accepted" }),
    EventInvite.create({ eventId: 1, userId: 1, status: "accepted" }),
    EventInvite.create({ eventId: 2, userId: 2, status: "rejected" }),
    EventInvite.create({ eventId: 1, userId: 1, status: "accepted" }),
    EventInvite.create({ eventId: 2, userId: 2, status: "pending" }),
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
