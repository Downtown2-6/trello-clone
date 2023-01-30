const express = require("express");
const router = express.Router();
const Event = require("../db/models/Event");

router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, start, end, userId } = req.body;
    const event = await Event.create({ title, start, end, userId });
    res.json(event);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
